#[cfg(test)]
mod tests {
    use crate::fixtures::fixture::TestBuilder;

    #[tokio::test]
    async fn test_initialize_ncn_vault_ticket_ok() {
        let fixture = TestBuilder::new().await;
        let mut restaking_program_client = fixture.restaking_program_client();

        let mut vault_program_client = fixture.vault_program_client();
        let (_vault_config_admin, vault_root) = vault_program_client
            .setup_config_and_vault(0, 0, 0)
            .await
            .unwrap();

        restaking_program_client
            .do_initialize_config()
            .await
            .unwrap();
        let ncn_root = restaking_program_client.do_initialize_ncn().await.unwrap();

        restaking_program_client
            .do_initialize_ncn_vault_ticket(&ncn_root, &vault_root.vault_pubkey)
            .await
            .unwrap();

        // Verify NCN state
        let ncn = restaking_program_client
            .get_ncn(&ncn_root.ncn_pubkey)
            .await
            .unwrap();
        assert_eq!(ncn.vault_count, 1);

        // Verify NCN vault ticket
        let ticket = restaking_program_client
            .get_ncn_vault_ticket(&ncn_root.ncn_pubkey, &vault_root.vault_pubkey)
            .await
            .unwrap();
        assert_eq!(ticket.ncn, ncn_root.ncn_pubkey);
        assert_eq!(ticket.vault, vault_root.vault_pubkey);
        assert_eq!(ticket.index, 0);
        assert_eq!(ticket.state.slot_added(), 1);
    }
}