var recommended = document.getElementById('recommended')
var popular = document.getElementById('popular')

function switchToRecommended() {
    popular.style.display = 'none';
    recommended.style.display = 'block';
}

function switchToPopular() {
    popular.style.display = 'block';
    recommended.style.display = 'none';
}