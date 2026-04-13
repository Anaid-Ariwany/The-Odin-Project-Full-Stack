# Sign-Up Form

[Live Demo](https://anaid-ariwany.github.io/The-Odin-Project-Full-Stack/Intermediate-HTML-CSS/Projects/Sign-Up-Form)

### Instructions

#### Step 1: Set up and planning
1. Set up your git repository (refer to past projects if you need a refresher).

2. Set up your HTML and CSS files with some dummy content, just to make sure you have everything linked correctly.

3. Download a full-resolution copy of the [design file](https://cdn.statically.io/gh/TheOdinProject/curriculum/afdbabfab03fbc34783c6b6f3920aba4a4d3b935/intermediate_html_css/forms/project_sign_up_form/imgs/sign-up-form.png), and get a general idea for how you’re going to need to lay things out in your HTML document.

#### Step 2: Gather assets
1. The design has a large background-image, so go find and download an image you want to use for that section. The one in the design can be found on [unsplash.com](https://unsplash.com/photos/25xggax4bSA), but feel free to select your own. Be sure to credit the creator of your image!

2. Pick an external font for the ‘logo’ section. We’ve used [Norse Bold](https://www.joelcarrouche.com/fonts/norse), but you can use any font you like.

3. For the image-sidebar, we’ve used this [Odin logo](https://cdn.statically.io/gh/TheOdinProject/curriculum/5f37d43908ef92499e95a9b90fc3cc291a95014c/html_css/project-sign-up-form/odin-lined.png).

#### Step 3: Some tips!
1. How you attack this project is mostly up to you, but it is wise to begin by scaffolding out the structure of the page, and then tackle the various sections one by one.

2. The area behind the “ODIN” logo is a div that has a dark, but semi-transparent background color. This enhances the readability of the text against the busy background image.

3. The color we’ve chosen for the ‘Create Account’ button is similar to tones found in the background image. Specifically, it is ` #596D48 `.

4. The inputs, by default have a very light border ( ` #E5E7EB` ), but we’ve included 2 variations. For starters, the password inputs should have a red border if they contain an invalid password. This can be handled with the `:invalid` pseudo-class you’ve learned in the previous lesson.

5. The other variation is the selected input, which should have a blue border and subtle box-shadow. This can be done with the `:focus` pseudo-class you’ve learned about in an earlier lesson.

6. Do not worry about making your project look nice on mobile. Responsive design isn’t covered until later in the curriculum.

7. Validating that the password fields match each other requires JavaScript. Using JavaScript to validate forms is covered in a future lesson. For now, just validate each field separately.