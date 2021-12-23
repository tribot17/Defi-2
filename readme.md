# Defi-2

Mise en place de tous les tests :

- Dans un 1er temps on test tous les changements d'état (WorkflowStatus)
- Dans un 2nd temps on test toutes les différentes fonctions

Comment fonctionne les tests ?

- Avant chaque test une nouvelle instance neuve du contract est créée afin d'être sur que le test soit "clean"

- Les tests vont récupéré les variables du contract pour ensuite les comparer avant et après l'appel de la fonction
  Example :

  //------Récupère les variables avant l'appel de la fonction

  //Accède à la 3eme valeur de la structure VoterMap (proposalId)

  let proposalIdBefore = (await this.VotingInstance.VoterMap(owner))[2];

  //Accède à la 2eme valeur de la structure VoterMap (hasVoted)

  let votedCountBefore = (await this.VotingInstance.ProposalMap(1))[1];

  //Accède à la 1er valeur de la structure ProposalMap (proposal)

  let proposal = (await this.VotingInstance.ProposalMap(1))[0];

  //------

  //------Appel de la fonction

  await this.VotingInstance.sendVote(1, { from: owner });

  //------Récupère les variables après l'appel de la fonction

  let hasVotedAfter = (await this.VotingInstance.VoterMap(owner))[1];

  let proposalIdAfter = (await this.VotingInstance.VoterMap(owner))[2];

  let votedCountAfter = (await this.VotingInstance.ProposalMap(1))[1];

  let winner = await this.VotingInstance.winner();

  //------

  //------Va ensuite comparé les variables avant et après ou avec la valeur attendue

  expect(hasVotedAfter).to.be.equal(true);

  //------Ici on sait que l'appel de la fonction va ajouter 1 au voteCount, donc votedCountAfter doit être égal à votedCountBefore + 1 (il est important de préciser bignumber car votedCountAfter retourne un bignumber il faut donc aussi convertir la valeur qu'on ajoute en bignumber)

  expect(votedCountAfter).to.be.bignumber.equal(votedCountBefore.add(new BN(1)));

  expect(proposalIdAfter).to.be.bignumber.equal(proposalIdBefore.add(new BN(1)));

  expect(winner).to.be.equal(proposal);
