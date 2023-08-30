import { createTag } from "../../scripts/miloUtils.js";

export default async function init(el) {
  if (getMobileOperatingSystem() == 'unknown') {
    el.innerHTML = '';
    return;
  }
  const children = el.querySelectorAll(':scope > div');

  // Get the first source's srcset
  let imagePath = document.querySelector('source').getAttribute('srcset');
  let appStoreLinks = children[6].textContent.trim().split(',');


  createTag.then((createTag) => {
    const appBannerLeft = createTag('div', { class: 'app-banner-left' }, '');
    const closeBtn = createTag('div', { class: 'app-banner-close', role: 'text', 'aria-label': 'Close banner' }, '×');
    appBannerLeft.append(closeBtn);
    const icon = createTag('div', { class: 'app-banner-icon' }, '');
    const appIcon = createTag('img', { src: `${imagePath}` }, '');
    icon.append(appIcon);
    appBannerLeft.append(icon);
    const appComp = createTag('div', { class: 'app-banner-title' }, children[0].textContent.trim());
    const appDesc = createTag('div', { class: 'app-banner-description' }, children[2].textContent.trim());
    const appStars = createTag('div', { class: 'app-banner-stars', role: 'text', 'aria-label': 'Average rating 5 stars' }, '');
    const star = createTag('span', {}, '★');
    const star1 = createTag('span', {}, '★');
    const star2 = createTag('span', {}, '★');
    const star3 = createTag('span', {}, '★');
    appStars.append(star, star1, star2, star3);
    let reviews = children[4].textContent.trim();
    let openButton = children[5].textContent.trim();
    const appReviews = createTag('div', { class: 'app-banner-reviews', 'aria-label': '' }, reviews);
    const appBannerRight = createTag('div', { class: 'app-banner-right' }, '');
    const open = createTag('div', { class: 'app-banner-button', role: 'text', 'aria-label': openButton }, openButton);
    appBannerRight.append(open);
    const appBannerContent = createTag('div', { class: 'app-banner-content' }, '');
    const appBanner = createTag('div', { class: 'app-banner' }, '');
    const appBannerDetails = createTag('div', { class: 'app-banner-details' }, '');
    appBannerDetails.append(appComp, appDesc, appStars, appReviews);
    appBannerLeft.append(appBannerDetails);
    appBannerContent.append(appBannerRight, appBannerLeft);
    appBanner.append(appBannerContent);
    el.innerHTML = '';
    document.head.before(appBanner);
  });
}

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }

  return 'unknown';
}
