ghostList = [
    {
        type: 'Banshee',
        evidence: ['EMF Level 5', 'Fingerprints', 'Freezing Temperatures']
    },
    {
        type: 'Demon',
        evidence: ['Ghost Writing', 'Freezing Temperatures', 'Spirit Box']
    },
    {
        type: 'Jinn',
        evidence: ['EMF Level 5', 'Ghost Orb', 'Spirit Box']
    },
    {
        type: 'Mare',
        evidence: ['Freezing Temperatures', 'Ghost Orb', 'Spirit Box']
    },
    {
        type: 'Oni',
        evidence: ['EMF Level 5', 'Ghost Writing', 'Spirit Box']
    },
    {
        type: 'Phantom',
        evidence: ['EMF Level 5', 'Freezing Temperatures', 'Ghost Orb']
    },
    {
        type: 'Poltergeist',
        evidence: ['Fingerprints', 'Spirit Box', 'Ghost Orb']
    },
    {
        type: 'Revenant',
        evidence: ['EMF Level 5', 'Fingerprints', 'Ghost Writing']
    },
    {
        type: 'Shade',
        evidence: ['EMF Level 5', 'Ghost Orb', 'Ghost Writing']
    },
    {
        type: 'Spirit',
        evidence: ['Spirit Box', 'Fingerprints', 'Ghost Writing']
    },
    {
        type: 'Wraith',
        evidence: ['Freezing Temperatures', 'Fingerprints', 'Spirit Box']
    },
    {
        type: 'Yurei',
        evidence: ['Freezing Temperatures', 'Ghost Orb', 'Ghost Writing']
    }
];
// console.log(ghostList);

let possibleGhostType = [];
let possibleEvidence = [];

evidenceOneForm = document.querySelector('.form1');
evidenceOneRadioList = document.querySelectorAll('[name=evidenceOneRadio]');
evidenceTwoForm = document.querySelector('.form2');
evidenceTwoRadioList = document.querySelectorAll('[name=evidenceTwoRadio]');

message = document.querySelector('#message');

evidenceOneForm.addEventListener('change', getFinalEvidence)
evidenceTwoForm.addEventListener('change', getFinalEvidence)

getFinalEvidence();

// Get third evidence
function getFinalEvidence() {    
    possibleGhostType = [];
    output = '';

    evidenceOne = getCheckedEvidence(evidenceOneRadioList);
    evidenceTwo = getCheckedEvidence(evidenceTwoRadioList);
    // console.log(evidenceOne);
    // console.log(evidenceTwo);

    if (evidenceOne === '' || evidenceTwo === '') {
        // If either of the first 2 evidences are empty 
        message.innerHTML = `<h4>Choose 2 type of evidence</h4>`;
    } else if (evidenceOne === evidenceTwo) {
        // If selected evidence are the same
        message.innerHTML = `<h4>Evidence can\'t be the same</h4>`;
        console.log('Evidence can\'t be the same');
    } else {
        // If first 2 evidence aren't empty or the same 
        message.innerHTML = `<h4></h4>`;

        ghostList.forEach(ghost => {
            const evidenceOneMatch = ghost.evidence.includes(evidenceOne);
            const evidenceTwoMatch = ghost.evidence.includes(evidenceTwo);

            // Check which ghost type matches the first 2 evidence
            if (evidenceOneMatch && evidenceTwoMatch) {
                // Finds last missing evidence
                const haveEvidence1 = ghost.evidence[0] === evidenceOne || ghost.evidence[0] === evidenceTwo;
                const haveEvidence2 = ghost.evidence[1] === evidenceOne || ghost.evidence[1] === evidenceTwo;
                const haveEvidence3 = ghost.evidence[2] === evidenceOne || ghost.evidence[2] === evidenceTwo;
                if (haveEvidence2 && haveEvidence3) {
                    missingEvidence = ghost.evidence[0];
                } else if (haveEvidence1 && haveEvidence3) {
                    missingEvidence = ghost.evidence[1];
                } else {
                    missingEvidence = ghost.evidence[2];
                }

                possibleGhostType.push({type: ghost.type, missingEvidence});
            }
        })

        // Save missing evidences and corresponding ghost type
        possibleGhostType.forEach(el => output += `<li>${el.type} --> ${el.missingEvidence}</li>`)
        
    }

    document.querySelector('#evidence3List').innerHTML = `<ul>${output}</ul>`;
};

// Gets the checked radio
function getCheckedEvidence(evidenceList) {
    let evidence = '';
    evidenceList.forEach((radio) => {
        if (radio.checked) {
            evidence = radio.value;
        }
    });
    return evidence
}