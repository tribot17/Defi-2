# Defi-2

Mise en place de tous les tests :

- Dans un 1er temps on test tous les changements d'état (WorkflowStatus)
- Dans un 2nd temps on test toutes les différentes fonctions
- Dans un 3eme temps on test tous les cas "revert", ou la fonction ne fonctionne pas

Comment fonctionne les tests ?

- Avant chaque test une nouvelle instance neuve du contract est créée afin d'être sur que le test soit "clean"

- Les tests vont récupéré les variables du contract pour ensuite les comparer avant et après l'appel de la fonction
  Example :

  //------Récupère les variables avant l'appel de la fonction

  //------Accède à la 3eme valeur de la structure VoterMap (proposalId)

  let proposalIdBefore = (await this.VotingInstance.VoterMap(owner))[2];

  //------Accède à la 2eme valeur de la structure VoterMap (hasVoted)

  let votedCountBefore = (await this.VotingInstance.ProposalMap(1))[1];

  //------Accède à la 1er valeur de la structure ProposalMap (proposal)

  let proposal = (await this.VotingInstance.ProposalMap(1))[0];

  //------Appel de la fonction

  await this.VotingInstance.sendVote(1, { from: owner });

  //------Récupère les variables après l'appel de la fonction

  let hasVotedAfter = (await this.VotingInstance.VoterMap(owner))[1];

  let proposalIdAfter = (await this.VotingInstance.VoterMap(owner))[2];

  let votedCountAfter = (await this.VotingInstance.ProposalMap(1))[1];

  let winner = await this.VotingInstance.winner();

  //------

  //------On vérifie que la fonction émette un évenement.
  expectEvent(receipt, "Voted", {voter: owner, proposalId:new BN(1)});

  //------Va ensuite comparé les variables avant et après ou avec la valeur attendue

  expect(hasVotedAfter).to.be.equal(true);

  //------Ici on sait que l'appel de la fonction va ajouter 1 au voteCount, donc votedCountAfter doit être égal à votedCountBefore + 1 (il est important de préciser bignumber car votedCountAfter retourne un bignumber il faut donc aussi convertir la valeur qu'on ajoute en bignumber)

  expect(votedCountAfter).to.be.bignumber.equal(votedCountBefore.add(new BN(1)));

  expect(proposalIdAfter).to.be.bignumber.equal(proposalIdBefore.add(new BN(1)));

  expect(winner).to.be.equal(proposal);

Comment vérifie qu'un test est sensé echouer ?

- Le processus est similaire à celui des tests mais au lieu d'utiliser la fonction expect nous allons utiliser expectRevert car on s'attend à avoir un revert

- example :

  await this.VotingInstance.addWhiteList(owner);

  await this.VotingInstance.startProposalsSession();

  await this.VotingInstance.sendProposal("Salut", { from: owner });

  await this.VotingInstance.endProposalsSession();
  //------On va à l'étape qu'on veut

  //------Ensuite on appelle la fonction qui est sensé echouer avec en second arguments le message d'erreur attendu
  await expectRevert(this.VotingInstance.sendVote(1, { from: owner }), "The session doesn't have started yet");
