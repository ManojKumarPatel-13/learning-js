import { bus, loadFeed } from "./engines/viewportEngine.js";

let currentChannel = "articles";
let currentPage = 1;
let isLoading = false;

const feedContainer = document.getElementById("mediaFeed");
const sentinel = document.getElementById("scrollSentinel");

bus.on("feed:loaded", (cleanData) => {
    if (currentPage === 1) {
        feedContainer.innerHTML = "";
    }

    if (!cleanData || cleanData.length === 0) {
        isLoading = true;
        return;
    }

    cleanData.forEach(item => {
        let sourceClass = "card-articles";
        let tagText = "📚 ARTICLE";

        if (item.source === "imgflip") {
            sourceClass = "card-memes";
            tagText = "🎭 MEME";
        } else if (item.source === "newsapi") {
            sourceClass = "card-news";
            tagText = "📰 INDUSTRY NEWS";
        }

        const cardHTML = `
            <div class="media-card ${sourceClass}" id="${item.id}" data-image="${item.image || ''}">
                <div class="card-tag">${tagText}</div>
                <h3 class="card-title">${item.title}</h3>
                <div class="card-meta">Source: ${item.source}</div>
                <p style="font-size: 14px; color: var(--text-muted); margin: 0 0 15px 0;">
                    ${item.description || ''}
                </p>
            </div>
        `;
        feedContainer.innerHTML += cardHTML;
    });
    isLoading = false;
});

const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        navButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const channel = btn.getAttribute("data-channel");

        currentChannel = (channel === "all") ? "articles" : channel;
        currentPage = 1;
        isLoading = true;

        loadFeed(currentChannel, currentPage, 10);
    });
});

const observerCallback = (entries) => {
    const [entry] = entries;

    if (entry.isIntersecting && !isLoading) {
        isLoading = true;
        currentPage++;

        console.log(`[SENTINEL]: Tripped! Loading channel: ${currentChannel}, Page: ${currentPage}`);
        loadFeed(currentChannel, currentPage, 10);
    }
};

const feedObserver = new IntersectionObserver(observerCallback, {
    root: null,
    rootMargin: "200px",
    threshold: 0.1
});

feedObserver.observe(sentinel);

isLoading = true;
loadFeed(currentChannel, currentPage, 10);

const mediaModal = document.getElementById("mediaModal");
const closeModal = document.getElementById("closeModal");
const modalBody = document.getElementById("modalBody");

feedContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".media-card");
    if (!card) return;

    const title = card.querySelector(".card-title").innerText;
    const meta = card.querySelector(".card-meta").innerText;
    const description = card.querySelector("p") ? card.querySelector("p").innerText : "";
    const imgUrl = card.dataset.image;

    modalBody.innerHTML = `
        <div style="margin-top: 20px;">
            <span class="text-green" style="font-size: 11px; letter-spacing: 1px; font-weight: bold;">
               SYSTEM NODE DETAILS // SECURE_VIEW
            </span>
            <h1 style="font-size: 24px; margin: 15px 0 10px 0; line-height: 1.3;">${title}</h1>
            <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">${meta}</div>
            
            ${imgUrl ? `<img src="${imgUrl}" class="modal-image" alt="Node Media Preview">` : ''}
            
            <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 20px 0;">
            <p style="font-size: 16px; line-height: 1.6; color: #e1e1e6;">${description || 'No further contextual string metadata transmitted by server payload.'}</p>
        </div>
    `;

    mediaModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
    mediaModal.classList.add("hidden");
});

mediaModal.addEventListener("click", (e) => {
    if (e.target === mediaModal) mediaModal.classList.add("hidden");
});