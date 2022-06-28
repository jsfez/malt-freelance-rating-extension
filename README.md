<h1 style="display:flex;align-items:center;column-gap:10px">
  <img src="src/img/icon-128.png" width="64" alt="malt Freelance Rating logo" title="malt Freelance Rating" />
  malt Freelance Rating
</h1>

Chrome extension to improve freelance head hunting on [Malt.fr](www.malt.fr).

- 1-click button to add freelances in your list
- 1-click button to update recruiting pipe
- Get smart data overview on profile page

**Note:** This plugin was initially created for personal use. It is so useful that I chose to share it.

---

### Demo

**Synopsis :**

- Create a new hunting list and add target skills for smart data overview
- 1-click to add _Monique S._ in my hunting list
- Clicks on _Paul Michigan_ status button to set his status to "Freelance refusal".

## <video src="https://user-images.githubusercontent.com/15954562/175993009-d7bdc3d7-43a5-4b34-890c-6ad22198d4d0.mp4" controls="controls" muted="muted" style="max-height:400px;" />

---

### Improved profile page

<img
  src="https://res.cloudinary.com/smooth/image/upload/v1656406748/malt-profile-rating-plugin/Capture_d_e%CC%81cran_2022-06-28_a%CC%80_10.57.16.png"
  title="freelance page details" alt="freelance-page-details" width="500px" />

1. Smart overview on target skills
2. Status button : get visual on recruiting status. Click to add freelance in your list or update recruiting status
3. Linkedin button to cross-compare profile data

---

### Technical note and greeting

For this project, I used :

- The wonderful [chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react) by [@lxieyang](https://github.com/lxieyang)
- [Ariakit](https://github.com/ariakit/ariakit) by [@diegohaz](https://twitter.com/diegohaz) to insure accessibility
- And [xstyled](https://github.com/gregberge/xstyled) by my friend [@neoziro](https://twitter.com/neoziro) for design purpose

#### Bugs and limitations

All data are stored locally in chrome storage whom limit the store entries count to 500. Accordingly, you have to delete an old list if you reach this threshold and wand to add new freelance to your list.
