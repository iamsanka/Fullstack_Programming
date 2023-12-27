// Function to calculate the total points and grade
function calculate() {
    // Get the values of test scores
    const test1Points = parseInt(document.getElementById('test1').value);
    const test2Points = parseInt(document.getElementById('test2').value);
    const test3Points = parseInt(document.getElementById('test3').value);
    const test4Points = parseInt(document.getElementById('test4').value);

    // Calculate the total points
    const totalPoints = test1Points + test2Points + test3Points + test4Points;

    // Determine the grade based on the total points
    let grade = 0;
    if (totalPoints >= 0 && totalPoints <= 12) {
        grade = 0;
    } else if (totalPoints >= 13 && totalPoints <= 15) {
        grade = 1;
    } else if (totalPoints >= 16 && totalPoints <= 17) {
        grade = 2;
    } else if (totalPoints >= 18 && totalPoints <= 19) {
        grade = 3;
    } else if (totalPoints >= 20 && totalPoints <= 21) {
        grade = 4;
    } else if (totalPoints >= 22 && totalPoints <= 24) {
        grade = 5;
    }

    // Update the displayed total points and grade
    document.getElementById('totalPoints').textContent = totalPoints;
    document.getElementById('grade').textContent = grade;
}

// Initial calculation when the page loads
calculate();
