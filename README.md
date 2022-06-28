# <img src="src/img/icon-128.png" width="64" alt="malt Freelance Rating logo" title="malt Freelance Rating"  valign="middle"  /> &nbsp;malt Freelance Rating


Chrome extension to improve freelance head hunting on [Malt.fr](www.malt.fr).

- 1-click button to add freelances in your list
- 1-click button to update recruiting pipe
- Get smart data overview on profile page

**Note:** This plugin was initially created for personal use. It is so useful that I chose to share it.

## Demo

https://user-images.githubusercontent.com/15954562/175993009-d7bdc3d7-43a5-4b34-890c-6ad22198d4d0.mp4

**Synopsis :**

- Create a new hunting list and add target skills for smart data overview
- 1-click to add _Monique S._ in my hunting list
- Clicks on _Paul Michigan_ status button to set his status to "Freelance refusal"


## Screenshots
### Improved profile page

<img
  src="https://res.cloudinary.com/smooth/image/upload/v1656406748/malt-profile-rating-plugin/Capture_d_e%CC%81cran_2022-06-28_a%CC%80_10.57.16.png"
  title="freelance page details" alt="freelance-page-details" width="700px" />

1. Smart overview on target skills
2. Status button : get visual on recruiting status. Click to add freelance in your list or update recruiting status
3. Linkedin button to cross-compare profile data

### Extension screenshots
<p float="left">
  <img width="250" alt="popup" src="https://user-images.githubusercontent.com/15954562/176177912-bfae8c98-fe10-40cb-b39c-051d0cdca3ae.png">&nbsp;&nbsp;
  <img width="250" alt="popup-open-select" src="https://user-images.githubusercontent.com/15954562/176178660-88fc566d-ee73-4a8a-9d68-2a38a56dd78f.png">&nbsp;&nbsp;
  <img width="250" alt="popup-settings" src="https://user-images.githubusercontent.com/15954562/176178383-2174d004-979b-42eb-b9de-cf77d7968d1e.png">&nbsp;&nbsp;
</p>

## Technical note and greeting

For this project, I used :

- The wonderful [chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react) by [@lxieyang](https://github.com/lxieyang)
- [Ariakit](https://github.com/ariakit/ariakit) by [@diegohaz](https://twitter.com/diegohaz) to insure accessibility
- And [xstyled](https://github.com/gregberge/xstyled) by my friend [@neoziro](https://twitter.com/neoziro) for design purpose

### Bugs and limitations

All data are stored locally in chrome storage whom limit the store entries count to 500. Accordingly, you have to delete an old list if you reach this threshold and wand to add new freelance to your list.
