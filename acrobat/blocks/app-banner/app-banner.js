import {createTag} from "../../scripts/miloUtils.js";

export default async function init(el){
  const children = el.querySelectorAll(':scope > div');
  let i=0;
  children.forEach(divEle => {
    if(divEle.textContent != '')
      console.log((i++)+':'+ divEle.textContent);
  });

  const chi=el.querySelectorAll('div.img');
  chi.forEach(divEle => {
    if(divEle.textContent != '')
      console.log((i++)+':'+ divEle.textContent);
  });

  // Get the first source's srcset
  let imagePath = document.querySelector('source').getAttribute('srcset');
  
  createTag.then((createTag) => {
    const appBannerLeft = createTag('div', { class: 'app-banner-left' }, '');
    const closeBtn = createTag('div', { class: 'app-banner-close', role: 'text', 'aria-label':'Close banner' }, '×');
    appBannerLeft.append(closeBtn);
    const icon = createTag('div', { class: 'app-banner-icon' }, '');
    const appIcon = createTag('img',{src: `${imagePath}`},'');
    icon.append(appIcon);
    appBannerLeft.append(icon);
    const appComp = createTag('div', { class: 'app-banner-title' }, children[0].textContent);
    const appDesc = createTag('div', { class: 'app-banner-description' }, children[2].textContent);
    const appStars = createTag('div', { class: 'app-banner-stars', role: 'text', 'aria-label':'Average rating 5 stars' }, '');
    const star = createTag('span',{}, '★');
    const star1 = createTag('span',{}, '★');
    const star2 = createTag('span',{}, '★');
    const star3 = createTag('span',{}, '★');
    appStars.append(star, star1, star2, star3);
    const appReviews = createTag('div', { class: 'app-banner-reviews', 'aria-label':'' }, `(${children[4].textContent})`);
    const appBannerRight = createTag('div', { class: 'app-banner-right' }, '');
    const open = createTag('div', { class: 'app-banner-button', role: 'text', 'aria-label':'OPEN' }, 'OPEN');
    appBannerRight.append(open);
    el.innerHTML = '';
    const appBannerContent = createTag('div', { class: 'app-banner-content' }, '');

    const appBannerDetails = createTag('div', { class: 'app-banner-details' }, '');
    appBannerDetails.append(appComp, appDesc, appStars, appReviews);
    appBannerLeft.append(appBannerDetails);
    appBannerContent.append(appBannerRight, appBannerLeft);
    //appBanner.append(appBannerContent);
    el.append(appBannerContent);
  });
}
