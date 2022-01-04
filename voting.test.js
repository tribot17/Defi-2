const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const Voting = artifacts.require("Voting");

contract("Voting", function (accounts) {
  const owner = accounts[0];
  const voter = accounts[1];

  beforeEach(async function () {
    this.VotingInstance = await Voting.new({ from: owner });
  });

  //-----------------------------------Changement d'état -----------------------------------//

  it("Passe de l'état VotingRegister à ProposalsRegisters", async function () {
    //Charge la variable workflowsStatus
    let statusBefore = await this.VotingInstance.workflowStatus();

    //Excute la fonction startProposalsSession
    let receipt = await this.VotingInstance.startProposalsSession();

    //  = await this.VotingInstance.WorkflowStatusChange()
    let statusAfter = await this.VotingInstance.workflowStatus();

    //statusBefore retourne un big number il faut donc convertir
<<<<<<< HEAD
    expectEvent(receipt, "WorkflowStatusChange", {
      previousStatus: new BN(Voting.WorkflowStatus.VotingRegister),
      newStatus: new BN(Voting.WorkflowStatus.ProposalsRegistrationStarted),
    });
    expect(statusBefore).to.be.a.bignumber.equal(statusAfter.sub(new BN(1)));
=======
     expectEvent(receipt, "WorkflowStatusChange" ,{previousStatus:new BN(Voting.WorkflowStatus.VotingRegister)
      ,newStatus:new BN(Voting.WorkflowStatus.ProposalsRegistrationStarted)});
    expect(statusBefore).to.be.a.bignumber.equal(statusAfter.sub(new BN(1))
    );
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("Passe de l'état ProposalsRegistrationStarted à ProposalsRegistrationEnded", async function () {
    //Il faut executer les autres fonction avant pour qu'on soit à la bonne étape puis aller chercher la variable
    await this.VotingInstance.startProposalsSession();
    let statusBefore = await this.VotingInstance.workflowStatus();

    let receipt = await this.VotingInstance.endProposalsSession();

    let statusAfter = await this.VotingInstance.workflowStatus();

<<<<<<< HEAD
    expectEvent(receipt, "WorkflowStatusChange", {
      previousStatus: new BN(
        Voting.WorkflowStatus.ProposalsRegistrationStarted
      ),
      newStatus: new BN(Voting.WorkflowStatus.ProposalsRegistrationEnded),
    });
    expect(statusBefore).to.be.a.bignumber.equal(statusAfter.sub(new BN(1)));
=======
    expectEvent(receipt, "WorkflowStatusChange" ,{previousStatus:new BN(Voting.WorkflowStatus.ProposalsRegistrationStarted)
      ,newStatus:new BN(Voting.WorkflowStatus.ProposalsRegistrationEnded)});
    expect(statusBefore).to.be.a.bignumber.equal(statusAfter.sub(new BN(1))
    );   
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("Passe de l'état ProposalsRegistrationEnded à VotingSessionStarted", async function () {
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.endProposalsSession();

    let statusBefore = await this.VotingInstance.workflowStatus();

    let receipt = await this.VotingInstance.startVoteSession();

    let statusAfter = await this.VotingInstance.workflowStatus();

<<<<<<< HEAD
    expectEvent(receipt, "WorkflowStatusChange", {
      previousStatus: new BN(Voting.WorkflowStatus.ProposalsRegistrationEnded),
      newStatus: new BN(Voting.WorkflowStatus.VotingSessionStarted),
    });
    expect(statusBefore).to.be.a.bignumber.equal(statusAfter.sub(new BN(1)));
=======
    expectEvent(receipt, "WorkflowStatusChange" ,{previousStatus:new BN(Voting.WorkflowStatus.ProposalsRegistrationEnded)
      ,newStatus:new BN(Voting.WorkflowStatus.VotingSessionStarted)});
      expect(statusBefore).to.be.a.bignumber.equal(statusAfter.sub(new BN(1))
      ); 
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("Passe de l'état VotingSessionStarted à VotingSessionEnded", async function () {
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();

    let statusBefore = await this.VotingInstance.workflowStatus();
    let receipt = await this.VotingInstance.endVoteSession();
    let statusAfter = await this.VotingInstance.workflowStatus();

<<<<<<< HEAD
    expectEvent(receipt, "WorkflowStatusChange", {
      previousStatus: new BN(Voting.WorkflowStatus.VotingSessionStarted),
      newStatus: new BN(Voting.WorkflowStatus.VotingSessionEnded),
    });
    expect(statusBefore).to.be.a.bignumber.equal(statusAfter.sub(new BN(1)));
  });
=======
    let receipt = await this.VotingInstance.endVoteSession();
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d

  it("Echoue de passer de l'état VotingSessionStarted à VotingSessionEnded (Mauvaise étape)", async function () {
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.endProposalsSession();

<<<<<<< HEAD
    await expectRevert(
      this.VotingInstance.startProposalsSession(),
      "Wrong step"
    );
  });

  it("Echoue de passer de l'état VotingRegister à ProposalsRegisters (Not owner)", async function () {
    await expectRevert(
      this.VotingInstance.startProposalsSession({ from: voter }),
      "Ownable: caller is not the owner"
    );
  });

  it("Echoue de passer de l'état VotingRegister à ProposalsRegisters (Mauvaise étape)", async function () {
    await this.VotingInstance.startProposalsSession();
    await expectRevert(
      this.VotingInstance.startProposalsSession(),
      "The session is already started"
    );
=======
    expectEvent(receipt, "WorkflowStatusChange" ,{previousStatus:new BN(Voting.WorkflowStatus.VotingSessionStarted)
      ,newStatus:new BN(Voting.WorkflowStatus.VotingSessionEnded)});
      expect(statusBefore).to.be.a.bignumber.equal(statusAfter.sub(new BN(1))
      ); 
  });

  it("Echoue de passer de l'état VotingSessionStarted à VotingSessionEnded (Mauvaise étape)", async function() {
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.endProposalsSession();

    await expectRevert(this.VotingInstance.startProposalsSession(),"Wrong step");
  });

  it("Echoue de passer de l'état VotingRegister à ProposalsRegisters (Not owner)", async function() {
    let statusBefore = await this.VotingInstance.workflowStatus();
    await expectRevert(this.VotingInstance.startProposalsSession({from:voter}),"Ownable: caller is not the owner");
  });

  it("Echoue de passer de l'état VotingRegister à ProposalsRegisters (Mauvaise étape)", async function() {
    await this.VotingInstance.startProposalsSession();
    await expectRevert(this.VotingInstance.startProposalsSession(),"The session is already started");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  //----------------------------------------------------------------------------------------//

  it("Ajouté une addresse à la white list", async function () {
    let receipt = await this.VotingInstance.addWhiteList(owner, {
      from: owner,
    });
    let data = await this.VotingInstance.VoterMap(owner);
    let status = await this.VotingInstance.workflowStatus();

    expectEvent(receipt, "VoterRegistered", { voterAddress: owner });
    expect(data[0]).to.be.equal(true);
    expectEvent(receipt, "VoterRegistered" ,{voterAddress:owner});
    expect(status).to.be.a.bignumber.equal(
      await new BN(Voting.enums.WorkflowStatus.RegisteringVoters)
    );
  });

  it("Ajoute un proposition", async function () {
    let status = await this.VotingInstance.workflowStatus();
    let propsalIdBefore = (await this.VotingInstance.ProposalMap(1))[1];
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();

<<<<<<< HEAD
    let receipt = await this.VotingInstance.sendProposal("Salut", {
      from: owner,
    });
=======
    let receipt = await this.VotingInstance.sendProposal("Salut", { from: owner });
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d

    let propsalIdAfter = (await this.VotingInstance.ProposalMap(1))[1];
    let propsalAfter = (await this.VotingInstance.ProposalMap(1))[0];

<<<<<<< HEAD
    expectEvent(receipt, "ProposalRegistered", { proposalId: new BN(1) });
=======
    expectEvent(receipt, "ProposalRegistered" ,{proposalId:new BN(1)});
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
    expect(propsalAfter).to.be.equal("Salut");
    expect(propsalIdAfter).to.be.a.bignumber.equal(propsalIdBefore);
    expect(status).to.be.a.bignumber.equal(
      await new BN(Voting.enums.WorkflowStatus.RegisteringVoters)
    );
  });

  it("Retourne une proposition", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });

    let data = await this.VotingInstance.seeProposition(1);

    expect(data[0]).to.be.equal("Salut");
  });

  it("Envoie un nouveau vote", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();

    let proposalIdBefore = (await this.VotingInstance.VoterMap(owner))[2];
    let votedCountBefore = (await this.VotingInstance.ProposalMap(1))[1];
    let proposal = (await this.VotingInstance.ProposalMap(1))[0];

    let receipt = await this.VotingInstance.sendVote(1, { from: owner });

    let hasVotedAfter = (await this.VotingInstance.VoterMap(owner))[1];
    let proposalIdAfter = (await this.VotingInstance.VoterMap(owner))[2];
    let votedCountAfter = (await this.VotingInstance.ProposalMap(1))[1];
    let winner = await this.VotingInstance.winner();

<<<<<<< HEAD
    expectEvent(receipt, "Voted", { voter: owner, proposalId: new BN(1) });
=======
    expectEvent(receipt, "Voted", {voter: owner, proposalId:new BN(1)});
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
    expect(hasVotedAfter).to.be.equal(true);
    expect(votedCountAfter).to.be.bignumber.equal(
      votedCountBefore.add(new BN(1))
    );
    expect(proposalIdAfter).to.be.bignumber.equal(
      proposalIdBefore.add(new BN(1))
    );
    expect(winner).to.be.equal(proposal);
  });

  it("Retourne le nombre de vote d'une propostion", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();
    await this.VotingInstance.sendVote(1, { from: owner });
    await this.VotingInstance.endVoteSession();

    let data = await this.VotingInstance.getStats(1, { from: owner });
    let votedCount = (await this.VotingInstance.ProposalMap(1))[1];

    expect(data).to.be.a.bignumber.equal(votedCount);
  });

  it("Choisi un gagnant", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();
    await this.VotingInstance.sendVote(1, { from: owner });
    await this.VotingInstance.endVoteSession();
    let statusBefore = await this.VotingInstance.workflowStatus();

    let receipt = await this.VotingInstance.setWinner(1);
    let statusAfter = await this.VotingInstance.workflowStatus();
    let winner = await this.VotingInstance.winner();
    let proposal = (await this.VotingInstance.ProposalMap(1))[0];

    expect(winner).to.be.a.bignumber.equal(proposal);
    expectEvent(receipt, "WorkflowStatusChange", {
      previousStatus: new BN(Voting.WorkflowStatus.VotingSessionEnded),
      newStatus: new BN(Voting.WorkflowStatus.VotesTallied),
    });
    expect(statusBefore).to.be.a.bignumber.equal(
      await new BN(Voting.enums.WorkflowStatus.VotingSessionEnded)
    );
    expect(statusAfter).to.be.a.bignumber.equal(
      await new BN(Voting.enums.WorkflowStatus.VotesTallied)
    );
  });

  it("Retourne le gagnant", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();
    await this.VotingInstance.sendVote(1, { from: owner });
    await this.VotingInstance.endVoteSession();
    await this.VotingInstance.setWinner(1);

    let status = await this.VotingInstance.workflowStatus();

    expect(status).to.be.a.bignumber.equal(
      await new BN(Voting.enums.WorkflowStatus.VotesTallied)
    );
  });

  it("N'est pas ajouté à la white list", async function () {
    await this.VotingInstance.addWhiteList(owner, {
      from: owner,
    });

<<<<<<< HEAD
    await expectRevert(
      this.VotingInstance.addWhiteList(owner),
      "This address is already whiteListed"
    );
=======
    await expectRevert(this.VotingInstance.addWhiteList(owner),"This address is already whiteListed");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("N'ajoute pas de proposition (la session n'a pas commencée)", async function () {
    await this.VotingInstance.addWhiteList(owner);

<<<<<<< HEAD
    await expectRevert(
      this.VotingInstance.sendProposal("Salut", { from: owner }),
      "The proposal session doesn't started yet"
    );
=======
    await expectRevert(this.VotingInstance.sendProposal("Salut", { from: owner }),"The proposal session doesn't started yet");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("N'ajoute pas de proposition (la proposition n'est pas valide)", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();

<<<<<<< HEAD
    await expectRevert(
      this.VotingInstance.sendProposal("", { from: owner }),
      "The proposal description is not valid"
    );
=======
    await expectRevert(this.VotingInstance.sendProposal("", { from: owner }),"The proposal description is not valid");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("N'ajoute pas de proposition (l'adresse n'est pas whitelistée)", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();

<<<<<<< HEAD
    await expectRevert(
      this.VotingInstance.sendProposal("Salut", { from: voter }),
      "You are not whitelisted"
    );
=======
    await expectRevert(this.VotingInstance.sendProposal("Salut", { from: voter }),"You are not whitelisted");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("Ne Retourne pas de proposition (la prosition n'existe pas)", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });

<<<<<<< HEAD
    await expectRevert(
      this.VotingInstance.seeProposition(0),
      "The proposal doesn't exist"
    );
=======
    await expectRevert(this.VotingInstance.seeProposition(0),"The proposal doesn't exist");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("N'envoie pas de nouveau vote (l'adresse n'est pas whitelisté)", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();
<<<<<<< HEAD

    await expectRevert(
      this.VotingInstance.sendVote(1, { from: voter }),
      "You are not whitelisted"
    );
=======
    
    await expectRevert(this.VotingInstance.sendVote(1, { from: voter }), "You are not whitelisted");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("N'envoie pas de nouveau vote (déjà voté)", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();
    await this.VotingInstance.sendVote(1, { from: owner });
<<<<<<< HEAD

    await expectRevert(
      this.VotingInstance.sendVote(1, { from: owner }),
      "You have already voted"
    );
=======
    
    await expectRevert(this.VotingInstance.sendVote(1, { from: owner }), "You have already voted");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("N'envoie pas de nouveau vote (la session n'a pas commencé)", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
<<<<<<< HEAD

    await expectRevert(
      this.VotingInstance.sendVote(1, { from: owner }),
      "The session doesn't have started yet"
    );
=======
    
    await expectRevert(this.VotingInstance.sendVote(1, { from: owner }), "The session doesn't have started yet");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("N'envoie pas de nouveau vote (proposition non valide)", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();

<<<<<<< HEAD
    await expectRevert(
      this.VotingInstance.sendVote(2, { from: owner }),
      "The proposal doesn't exist"
    );
  });

=======
    await expectRevert(this.VotingInstance.sendVote(2, { from: owner }), "The proposal doesn't exist");
  });
   
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  it("Ne retourne pas le nombre de vote d'une propostion (mauvaise étape)", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();
    await this.VotingInstance.sendVote(1, { from: owner });

<<<<<<< HEAD
    await expectRevert(
      this.VotingInstance.getStats(1, { from: owner }),
      "The session is not ended"
    );
=======
    await expectRevert(this.VotingInstance.getStats(1, { from: owner }),"The session is not ended");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("Ne retourne pas le nombre de vote d'une propostion (le contract n'est pas appellé par l'owner)", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();
    await this.VotingInstance.sendVote(1, { from: owner });

<<<<<<< HEAD
    await expectRevert(
      this.VotingInstance.getStats(1, { from: voter }),
      "Ownable: caller is not the owner"
    );
=======
    await expectRevert(this.VotingInstance.getStats(1, { from: voter }),"Ownable: caller is not the owner");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("Ne choisi pas un gagnant (le contract n'est pas appellé par l'owner)", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();
    await this.VotingInstance.sendVote(1, { from: owner });
    await this.VotingInstance.endVoteSession();

<<<<<<< HEAD
    await expectRevert(
      this.VotingInstance.setWinner(1, { from: voter }),
      "Ownable: caller is not the owner"
    );
=======
    await expectRevert(this.VotingInstance.setWinner(1,{from : voter }),"Ownable: caller is not the owner");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("Ne choisi pas un gagnant (la propostion n'est pas bonne)", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();
    await this.VotingInstance.sendVote(1, { from: owner });
    await this.VotingInstance.endVoteSession();

<<<<<<< HEAD
    await expectRevert(
      this.VotingInstance.setWinner(1, { from: voter }),
      "Ownable: caller is not the owner"
    );
=======
    await expectRevert(this.VotingInstance.setWinner(1,{from : voter }),"Ownable: caller is not the owner");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("Ne retourne pas le gagnant (pas la bonne étape)", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();
    await this.VotingInstance.sendVote(1, { from: owner });

<<<<<<< HEAD
    await expectRevert(
      this.VotingInstance.setWinner(1),
      "The session is not ended."
    );
=======
    await expectRevert(this.VotingInstance.setWinner(1),"The session is not ended.");
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
  });

  it("Retourne pour quoi a voter une addresse", async function () {
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();
    await this.VotingInstance.sendVote(1, { from: owner });

    let data = await this.VotingInstance.votedFor(owner);

    expect(data).to.be.a.bignumber.equal(new BN(1));
  });

  it("Ne retourne pas pour quoi a voter une addresse (l'adresse n'a pas voté)", async function () {
<<<<<<< HEAD
    await this.VotingInstance.addWhiteList(owner);
    await this.VotingInstance.startProposalsSession();
    await this.VotingInstance.sendProposal("Salut", { from: owner });
    await this.VotingInstance.endProposalsSession();
    await this.VotingInstance.startVoteSession();
    await this.VotingInstance.sendVote(1, { from: owner });

    await expectRevert(
      this.VotingInstance.votedFor(voter),
      "The address hasn't voted yet"
    );
  });
});
=======
      await this.VotingInstance.addWhiteList(owner);
      await this.VotingInstance.startProposalsSession();
      await this.VotingInstance.sendProposal("Salut", { from: owner });
      await this.VotingInstance.endProposalsSession();
      await this.VotingInstance.startVoteSession();
      await this.VotingInstance.sendVote(1, { from: owner });

      await expectRevert(this.VotingInstance.votedFor(voter),"The address hasn't voted yet");
    })
  });
>>>>>>> 940a906a4a00cc33d12681a24730120943b6543d
