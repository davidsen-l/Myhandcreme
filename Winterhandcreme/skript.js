/*Buttons reagierend -> shine effekt richtig ausrichten
Website nach und nach laden lassen
Bilder reagierend -> das problem mit den unterren ecken*/
// Elemente auswählen
const slider = document.getElementById("itemsSlider");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

// Scroll-Funktion für Buttons
function scrollItems(direction) {
  const item = slider.querySelector(".item");
  if (!item) return;

  const gap = 20; // entspricht CSS gap
  const scrollAmount = item.offsetWidth + gap;

  slider.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}

// Pfeile nur anzeigen, wenn Scroll möglich ist
function updateArrows() {
  const maxScroll = slider.scrollWidth - slider.clientWidth;

  // Linker Pfeil sichtbar, wenn nicht ganz links
  if (slider.scrollLeft > 0) {
    leftArrow.classList.add("can-scroll");
  } else {
    leftArrow.classList.remove("can-scroll");
  }

  // Rechter Pfeil sichtbar, wenn nicht ganz rechts
  if (slider.scrollLeft < maxScroll - 1) {
    rightArrow.classList.add("can-scroll");
  } else {
    rightArrow.classList.remove("can-scroll");
  }
}

// Event-Listener
slider.addEventListener("scroll", updateArrows);
window.addEventListener("resize", updateArrows);

// Nach Laden einmal prüfen
updateArrows();

document.addEventListener("DOMContentLoaded", () => {
    const shineButtons = document.querySelectorAll("button");

    shineButtons.forEach(button => {
        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);
    });

    /**
     * Berechnet die Richtung, aus der die Maus in den Button eintritt.
     * Nutzt die Distanz zu den vier Kanten (Top, Right, Bottom, Left).
     * @param {MouseEvent} event 
     */
    function handleMouseEnter(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();

        // 1. Distanzen von der Mausposition zu den vier Kanten berechnen
        // mouseX ist die X-Koordinate der Maus relativ zum Viewport
        // rect.left ist die X-Koordinate der linken Kante des Buttons
        
        const distances = {
            top: event.clientY - rect.top,       // Distanz zur oberen Kante
            right: rect.right - event.clientX,   // Distanz zur rechten Kante
            bottom: rect.bottom - event.clientY, // Distanz zur unteren Kante
            left: event.clientX - rect.left      // Distanz zur linken Kante
        };

        // 2. Den kleinsten Wert finden (die Maus ist der Kante am nächsten)
        let closestEdge = "top";
        let minDistance = distances.top;

        for (const edge in distances) {
            if (distances[edge] < minDistance) {
                minDistance = distances[edge];
                closestEdge = edge;
            }
        }
        
        // 3. Ergebnis setzen
        // Das Attribut muss den vollen Namen der Richtung enthalten
        button.setAttribute('data-direction', closestEdge);
    }
    
    /**
     * Entfernt das data-Attribut beim Verlassen
     */
    function handleMouseLeave(event) {
        event.currentTarget.removeAttribute('data-direction');
    }
});