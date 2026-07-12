const videos = document.querySelectorAll("video");

videos.forEach((video) => {
    video.addEventListener("play", () => {
        videos.forEach((otherVideo) => {
            if (otherVideo !== video && !otherVideo.paused) otherVideo.pause();
        });
    });
});

const lightbox = document.querySelector("#galleryLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const closeLightbox = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
        lightboxImage.src = item.dataset.full;
        lightboxImage.alt = item.querySelector("img").alt;
        lightboxTitle.textContent = item.dataset.title;
        lightbox.showModal();
        closeLightbox.focus();
    });
});

closeLightbox.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
});

lightbox.addEventListener("close", () => {
    lightboxImage.removeAttribute("src");
});
