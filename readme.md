# Defi-2

Mise en place de tous les tests :

- Dans un 1er temps on test tous les changements d'état (WorkflowStatus)
- Dans un 2nd temps on test toutes les différentes fonctions

Comment fonctionne les tests ?

- Les tests vont récupéré les variables du contract pour ensuite les comparé avant et après l'appel de la fonction
  Example :

  let proposalIdBefore = (await this.VotingInstance.VoterMap(owner))[2];

  let votedCountBefore = (await this.VotingInstance.ProposalMap(1))[1];

  let proposal = (await this.VotingInstance.ProposalMap(1))[0];

  //------Récupère les variables avant l'appel de la fonction

  //------Appel de la fonction
  await this.VotingInstance.sendVote(1, { from: owner });

  let hasVotedAfter = (await this.VotingInstance.VoterMap(owner))[1];

  let proposalIdAfter = (await this.VotingInstance.VoterMap(owner))[2];

  let votedCountAfter = (await this.VotingInstance.ProposalMap(1))[1];

  let winner = await this.VotingInstance.winner();

  //------Récupère les variables après l'appel de la fonction

  //Va ensuite comparé les variables avant et après

  expect(hasVotedAfter).to.be.equal(true);

  //------Ici on sait que l'appel de la fonction va ajouter 1 au voteCount
  votedCountAfter doit donc être égal à votedCountBefore + 1

  expect(votedCountAfter).to.be.bignumber.equal(votedCountBefore.add(new BN(1)));

  expect(proposalIdAfter).to.be.bignumber.equal(proposalIdBefore.add(new BN(1)));

  expect(winner).to.be.equal(proposal);
