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

  // Handle accordion button click
  $(".accordion-button").click(function () {
    const $content = $(this).next(".accordion-content");
    const $plusIcon = $(this).find(".plus-icon");

    // Close all other accordion items
    $(".accordion-button")
      .not(this)
      .each(function () {
        $(this).find(".plus-icon").text("+");
        $(this).next(".accordion-content").css("max-height", "0px");
      });

    // Toggle current accordion item
    if ($content.css("max-height") === "0px") {
      $content.css("max-height", $content[0].scrollHeight + "px");
      $plusIcon.text("−");
    } else {
      $content.css("max-height", "0px");
      $plusIcon.text("+");
    }
  });

  // Handle "Get in touch" button click
  $(".get-in-touch").click(function () {
    // Add your contact form logic here
    console.log("Get in touch button clicked");
  });

  // Handle "See All FAQ's" link click
  $(".see-all").click(function (e) {
    e.preventDefault();
    // Add your logic to show all FAQs or navigate to a full FAQ page
    console.log("See All FAQs link clicked");
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

  // Initialize product image
  let currentFlavor = "original";
  let currentImageIndex = 0;

  // Set initial main image
  updateMainImage();

  // Handle flavor selection
  $('input[name="flavor"]').change(function () {
    currentFlavor = $(this).val();
    currentImageIndex = 0;
    updateMainImage();
    updateThumbnailIndicators();
  });

  // Handle thumbnail clicks
  $(".thumbnail").click(function () {
    currentImageIndex = parseInt($(this).data("index"));
    updateMainImage();
    updateThumbnailIndicators();
  });

  // Handle navigation arrows
  $(".nav-arrow.prev").click(function () {
    navigateGallery(-1);
  });

  $(".nav-arrow.next").click(function () {
    navigateGallery(1);
  });

  // Handle subscription option selection
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
});
