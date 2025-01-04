document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    const eventDetailsEl = document.getElementById("event-details");
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");
  
    // Calendar Setup
    if (calendarEl) {
      $(calendarEl).fullCalendar({
        header: {
          left: "prev,next today",
          center: "title",
          right: "month,agendaWeek,agendaDay",
        },
        editable: true,
        displayEventTime: false,
        events: [
          {
            title: "Chef's Special Tasting",
            start: "2024-12-28T18:00:00",
            end: "2024-12-28T20:00:00",
            description:
              "Experience an exclusive tasting event featuring special dishes crafted by our head chef.",
          },
          {
            title: "Wine Pairing Dinner",
            start: "2024-07-21T18:00:00",
            end: "2024-07-21T20:00:00",
            description:
              "Join us for a delightful evening of fine dining paired with exquisite wines from renowned vineyards.",
          },
        ],
        eventRender: function (event, element) {
          const timeRange =
            moment(event.start).format("h:mm a") +
            " - " +
            moment(event.end).format("h:mm a");
          element.find(".fc-title").text(`${event.title} (${timeRange})`);
        },
        eventClick: function (event) {
          const details = `
            <h3>${event.title}</h3>
            <p><strong>Time:</strong> ${moment(event.start).format("h:mm a")} - ${moment(event.end).format("h:mm a")}</p>
            <p>${event.description}</p>
          `;
          eventDetailsEl.innerHTML = details;
          eventDetailsEl.style.display = "block";
        },
      });
    }
  
    // Helper function to toggle visibility
    const toggleNav = (targetNav) => {
      const isOpen = targetNav.style.display === "block";
      targetNav.style.display = isOpen ? "none" : "block";
      return !isOpen;
    };
  
    // Function to determine if the menu should close on click
    const shouldToggleMenu = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches; // Adjust breakpoint as needed
      return isMobile;
    };
  
    // Event listener for the hamburger menu
    if (hamburger && nav) {
      hamburger.addEventListener("click", function () {
        const isOpen = toggleNav(nav);
        hamburger.setAttribute("aria-expanded", isOpen);
      });
  
      document.addEventListener("click", function (e) {
        if (
          shouldToggleMenu() && // Only toggle on mobile
          !hamburger.contains(e.target) && // Not clicking on hamburger
          !nav.contains(e.target) // Not clicking inside nav
        ) {
          nav.style.display = "none";
          hamburger.setAttribute("aria-expanded", false);
        }
      });
    }
  
  
    // Reviews Carousel Functionality
    const reviewsContainer = document.querySelector(".reviews-container");
    const reviews = document.querySelectorAll(".review");
    const prevButton = document.getElementById("prev-review");
    const nextButton = document.getElementById("next-review");
  
    if (reviewsContainer && reviews.length > 0) {
      let currentIndex = 0;
  
      const updateReviews = () => {
        // Ensure only the current review is visible
        reviews.forEach((review, index) => {
          review.style.display = index === currentIndex ? "block" : "none";
        });
      };
  
      nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % reviews.length; // Cycle to the next review
        updateReviews();
      });
  
      prevButton.addEventListener("click", () => {
        currentIndex =
          (currentIndex - 1 + reviews.length) % reviews.length; // Cycle to the previous review
        updateReviews();
      });
  
      // Initialize the first review to be visible
      updateReviews();
    }
  });

      // Catering Form Email Functionality
      function sendEmail() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const eventType = document.getElementById("event-type").value;
        const date = document.getElementById("date").value;
        const guests = document.getElementById("guests").value;
        const notes = document.getElementById("notes").value;
    
        const subject = `Catering Request from ${name}`;
        const body = `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Event Type: ${eventType}
          Event Date: ${date}
          Number of Guests: ${guests}
          Additional Notes: ${notes}
        `;
    
        window.location.href = `mailto:flaminthaiemail@example.com?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
      }
  