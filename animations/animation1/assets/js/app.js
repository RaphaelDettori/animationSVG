 // Récupérer le formulaire et l'élément <div> pour afficher l'image SVG
 let svgForm = document.getElementById('svg-form');
 let svgDiv = document.getElementById('svg-div');
 let svg;

  // Récupérer le bouton de téléchargement
let downloadButton = document.getElementById('download-button');

 // Ajouter un gestionnaire d'événements submit au formulaire
 svgForm.addEventListener('submit', function(event) {
     // Empêcher la soumission par défaut du formulaire
     event.preventDefault();
     
     // Récupérer les valeurs du formulaire
let text = document.getElementById('text-input').value;
let fontFamily = document.getElementById('font-family-select').value;
let fontSize = document.getElementById('font-size-input').value;
let color = document.getElementById('color-input').value;
let dur = document.getElementById('duration-input').value;
let from = document.getElementById('from-input').value;
let to = document.getElementById('to-input').value;
let begin = document.getElementById('begin-input').value;
let fill = document.getElementById('fill-input').value;
let fillColor = document.getElementById('fill').value;
let strokeWidth = document.getElementById('stroke-width').value;
let strokeDasharray = document.getElementById('stroke-dasharray').value;
let values = document.getElementById('values').value;

// Générer l'image SVG
svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", window.innerWidth / 2);
svg.setAttribute("height", window.innerHeight / 2);

let id = Math.random().toString(36).substring(2, 12);

let textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
textElement.setAttribute("id", `text-${id}`);
textElement.setAttribute("x", "10");
textElement.setAttribute("y", "50");
textElement.setAttribute("font-family", fontFamily);
textElement.setAttribute("font-size", fontSize);
textElement.setAttribute("fill", fillColor);
textElement.setAttribute("stroke", color);
textElement.setAttribute("stroke-width", strokeWidth);
textElement.setAttribute("stroke-dasharray", strokeDasharray);
textElement.textContent = text;

let animateElement = document.createElementNS("http://www.w3.org/2000/svg", "animate");
animateElement.setAttribute("xlink:href", `#text-${id}`);
animateElement.setAttribute("attributeName", "stroke-dasharray");
animateElement.setAttribute("dur", dur);
animateElement.setAttribute("from", from);
animateElement.setAttribute("to", to);
animateElement.setAttribute("begin", begin);
animateElement.setAttribute("fill", fill);
animateElement.setAttribute("values", values)

textElement.appendChild(animateElement);
svg.appendChild(textElement);

     
     let serializer = new XMLSerializer();
     let svgData = serializer.serializeToString(svg);
     
     // Afficher l'image SVG dans l'élément <div>
     svgDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svgData + '</svg>';


     //Faire apparaitre le bouton download
    downloadButton.style.display = "block";

    textElement.removeChild(textElement.getElementsByTagName('animate')[0]);

 });


// Ajouter un gestionnaire d'événement au clic du bouton
downloadButton.addEventListener('click', function() {
  // Générer le contenu du fichier SVG
  let svgData = new XMLSerializer().serializeToString(svg);
  // Créer un objet Blob avec le contenu SVG
  let blob = new Blob([svgData], {type: "image/svg+xml"});
  // Créer un URL pour l'objet Blob
  let url = URL.createObjectURL(blob);
  // Créer un élément <a> pour le téléchargement
  let a = document.createElement('a');
  a.download = 'image.svg';
  a.href = url;
  // Ajouter l'élément <a> au document et déclencher le téléchargement
  document.body.appendChild(a);
  a.click();
  // Retirer l'élément <a> du document
  document.body.removeChild(a);
  // Libérer l'URL de l'objet Blob
  URL.revokeObjectURL(url);
});

