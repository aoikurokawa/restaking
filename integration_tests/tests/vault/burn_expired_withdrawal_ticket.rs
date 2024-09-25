#[cfg(test)]
mod tests {
    use jito_vault_core::{
        config::Config, vault_staker_withdrawal_ticket::VaultStakerWithdrawalTicket,
    };
    use solana_sdk::signature::{Keypair, Signer};

    use crate::fixtures::{
        fixture::{ConfiguredVault, TestBuilder},
        vault_client::VaultStakerWithdrawalTicketRoot,
    };

    #[tokio::test]
    async fn test_burn_expired_withdrawal_ticket_success() {
        const MINT_AMOUNT: u64 = 100_000;

        let deposit_fee_bps = 0;
        let withdraw_fee_bps = 0;
        let reward_fee_bps = 0;
        let num_operators = 1;
        let slasher_amounts = vec![];

        let mut fixture = TestBuilder::new().await;
        let ConfiguredVault {
            mut vault_program_client,
            restaking_program_client: _,
            vault_config_admin: _,
            vault_root,
            restaking_config_admin: _,
            ncn_root: _,
            operator_roots,
            slashers_amounts: _,
        } = fixture
            .setup_vault_with_ncn_and_operators(
                deposit_fee_bps,
                withdraw_fee_bps,
                reward_fee_bps,
                num_operators,
                &slasher_amounts,
            )
            .await
            .unwrap();

        // Initial deposit + mint
        let depositor1 = Keypair::new();
        let depositor2 = Keypair::new();
        vault_program_client
            .configure_depositor(&vault_root, &depositor1.pubkey(), MINT_AMOUNT)
            .await
            .unwrap();
        vault_program_client
            .do_mint_to(&vault_root, &depositor1, MINT_AMOUNT, MINT_AMOUNT)
            .await
            .unwrap();
        vault_program_client
            .configure_depositor(&vault_root, &depositor2.pubkey(), MINT_AMOUNT)
            .await
            .unwrap();
        vault_program_client
            .do_mint_to(&vault_root, &depositor2, MINT_AMOUNT, MINT_AMOUNT)
            .await
            .unwrap();

        let config = vault_program_client
            .get_config(&Config::find_program_address(&jito_vault_program::id()).0)
            .await
            .unwrap();

        // Delegate all funds to the operator
        vault_program_client
            .do_add_delegation(&vault_root, &operator_roots[0].operator_pubkey, MINT_AMOUNT)
            .await
            .unwrap();

        let VaultStakerWithdrawalTicketRoot { base: base1 } = vault_program_client
            .do_enqueue_withdraw(&vault_root, &depositor1, MINT_AMOUNT)
            .await
            .unwrap();
        let VaultStakerWithdrawalTicketRoot { base: base2 } = vault_program_client
            .do_enqueue_withdraw(&vault_root, &depositor2, MINT_AMOUNT)
            .await
            .unwrap();

        vault_program_client
            .do_cooldown_delegation(&vault_root, &operator_roots[0].operator_pubkey, MINT_AMOUNT)
            .await
            .unwrap();

        fixture
            .warp_slot_incremental(config.epoch_length())
            .await
            .unwrap();
        vault_program_client
            .do_full_vault_update(
                &vault_root.vault_pubkey,
                &[operator_roots[0].operator_pubkey],
            )
            .await
            .unwrap();
        fixture
            .warp_slot_incremental(config.epoch_length())
            .await
            .unwrap();
        vault_program_client
            .do_full_vault_update(
                &vault_root.vault_pubkey,
                &[operator_roots[0].operator_pubkey],
            )
            .await
            .unwrap();
        fixture.warp_slot_incremental(432_000).await.unwrap();

        vault_program_client
            .do_full_vault_update(
                &vault_root.vault_pubkey,
                &[operator_roots[0].operator_pubkey],
            )
            .await
            .unwrap();
        vault_program_client
            .do_burn_withdrawal_ticket(&vault_root, &depositor2, &base2, MINT_AMOUNT)
            .await
            .unwrap();

        let expired_queue = vault_program_client
            .get_vault_staker_withdrawal_ticket_expired_queue(&vault_root.expired_queue_pubkey)
            .await
            .unwrap();
        let ticket = VaultStakerWithdrawalTicket::find_program_address(
            &jito_vault_program::id(),
            &vault_root.vault_pubkey,
            &base1,
        )
        .0;

        assert_eq!(expired_queue.first().unwrap().ticket, ticket);

        vault_program_client
            .do_burn_expired_withdrawal_ticket(&vault_root, &depositor1.pubkey(), &base1)
            .await
            .unwrap();
    }
}
