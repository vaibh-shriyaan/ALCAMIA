$(document).ready(function () {
  $("#search-icon").click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Checking if the search bar is visible
    if ($("#search-bar").hasClass("hidden")) {
      // If hidden, showing it
      $(".nav-links").addClass("hidden");
      $("#search-bar").removeClass("hidden").addClass("show");
    } else {
      // If visible, hiding it
      $(".nav-links").removeClass("hidden");
      $("#search-bar").addClass("hidden").removeClass("show");
    }
  });

  $(document).click(function (e) {
    $(".nav-links").removeClass("hidden");
    $("#search-bar").addClass("hidden").removeClass("show");
  });

  $("#search-bar").click(function (e) {
    e.stopPropagation();
  });

  //count up figures
  function countUp() {
    $(".counter").each(function () {
      var $this = $(this),
        countTo = $this.attr("data-count");
      spanText = $this.find("span").html() || "";

      $({ countNum: $this.text() }).animate(
        { countNum: countTo },
        {
          duration: 8000,
          easing: "swing",
          step: function () {
            $this
              .contents()
              .first()
              .replaceWith(Math.floor(this.countNum) + "%");
          },
          complete: function () {
            $this
              .contents()
              .first()
              .replaceWith(this.countNum + "%");
          },
        }
      );
    });
  }

  // Detecting when section is in view
  $(window).on("scroll", function () {
    var statsTop = $("#stats").offset().top;
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();

    if (scrollTop + windowHeight > statsTop) {
      countUp();
      $(window).off("scroll");
    }
  });

  //FQAs
  $(".accordion-content").css("max-height", "0px");

  // Handling accordion button click
  $(".accordion-button").click(function () {
    const $content = $(this).next(".accordion-content");
    const $plusIcon = $(this).find(".plus-icon");

    // Closing all other accordion items
    $(".accordion-button")
      .not(this)
      .each(function () {
        $(this).find(".plus-icon").text("+");
        $(this).next(".accordion-content").css("max-height", "0px");
      });

    // Toggling current accordion item
    if ($content.css("max-height") === "0px") {
      $content.css("max-height", $content[0].scrollHeight + "px");
      $plusIcon.text("−");
    } else {
      $content.css("max-height", "0px");
      $plusIcon.text("+");
    }
  });

  //product cart
  const productGalleries = {
    original: [
      "/assets/images/slider1.png",
      "/assets/images/slider1.png",
      "/assets/images/slider1.png",
      "/assets/images/slider1.png",
    ],
    matcha: [
      "/assets/images/slider2-2.svg",
      "/assets/images/slider2-2.svg",
      "/assets/images/slider2-2.svg",
      "/assets/images/slider2-2.svg",
    ],
    cacao: [
      "/assets/images/slider3-3.svg",
      "/assets/images/slider3-3.svg",
      "/assets/images/slider3-3.svg",
      "/assets/images/slider3-3.svg",
    ],
  };

  let currentFlavor = "original";
  let currentImageIndex = 0;

  updateMainImage();

  // Handling flavor selection
  $('input[name="flavor"]').change(function () {
    currentFlavor = $(this).val();
    currentImageIndex = 0;
    updateMainImage();
    updateThumbnailIndicators();
  });

  // Handling thumbnail clicks
  $(".thumbnail").click(function () {
    currentImageIndex = parseInt($(this).data("index"));
    updateMainImage();
    updateThumbnailIndicators();
  });

  // Handling navigation arrows
  $(".nav-arrow.prev").click(function () {
    navigateGallery(-1);
  });

  $(".nav-arrow.next").click(function () {
    navigateGallery(1);
  });

  // Handling subscription option selection
  $(".subscription-option").click(function () {
    $(".subscription-option").removeClass("active");
    $(this).addClass("active");
  });

  // Function to update main product image
  function updateMainImage() {
    const gallery = productGalleries[currentFlavor];

    if (gallery && gallery.length > 0) {
      $("#main-product-image").attr("src", gallery[currentImageIndex]);
    }
  }

  // Function to update thumbnail indicators
  function updateThumbnailIndicators() {
    $(".thumbnail").removeClass("active");
    $(`.thumbnail[data-index="${currentImageIndex}"]`).addClass("active");
  }

  // Function to navigate through the gallery
  function navigateGallery(direction) {
    const gallery = productGalleries[currentFlavor];

    if (gallery && gallery.length > 0) {
      currentImageIndex =
        (currentImageIndex + direction + gallery.length) % gallery.length;
      updateMainImage();
      updateThumbnailIndicators();
    }
  }

  //testimonials
  const $track = $(".testimonial-track");
  const $slides = $(".testimonial-slide");
  const $dots = $(".dot");
  const slideCount = $slides.length;
  let currentIndex = 0;

  // Updating carousel position
  function updateCarousel() {
    const translateValue = -currentIndex * 100;
    $track.css("transform", `translateX(${translateValue}%)`);

    // Updating active dot
    $dots.removeClass("active");
    $dots.eq(currentIndex).addClass("active");
  }

  // Next slide
  $(".next-button").click(function () {
    if (currentIndex < slideCount - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Previous slide
  $(".prev-button").click(function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Clicking on dots
  $dots.click(function () {
    currentIndex = $(this).data("index");
    updateCarousel();
  });

  updateCarousel();

  // Adding touch swipe functionality
  let startX = 0;
  let endX = 0;

  $(".testimonial-carousel").on("touchstart", function (e) {
    startX = e.originalEvent.touches[0].clientX;
  });

  $(".testimonial-carousel").on("touchmove", function (e) {
    endX = e.originalEvent.touches[0].clientX;
  });

  $(".testimonial-carousel").on("touchend", function () {
    const difference = startX - endX;
    if (difference > 50 && currentIndex < slideCount - 1) {
      // Swipe left
      currentIndex++;
      updateCarousel();
    } else if (difference < -50 && currentIndex > 0) {
      // Swipe right
      currentIndex--;
      updateCarousel();
    }
  });

  // Auto sliding every 5 seconds
  setInterval(function () {
    if (currentIndex < slideCount - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }, 5000);
});
