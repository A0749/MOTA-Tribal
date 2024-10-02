// script.js
document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('cardMap');
    const gridContainer = document.getElementById('gridContainer');
    const cardImage = document.getElementById('card-image');
    const cardHeading = document.getElementById('card-heading');
    const cardSubheading = document.getElementById('card-subheading');
    const cardParagraph = document.getElementById('card-paragraph');
    const scrollValueDisplay = document.getElementById('scroll-value');
    const header = document.getElementById('message'); // Change this to the correct selector for your header

    const scrollThreshold = 100; // Define how much scroll should trigger hiding or showing the card
    let lastScrollTop = 50;

    let currentContent = null; // To track the currently displayed content
    let highlightedElement = null; // To track the currently highlighted element

    const areas = {
        'INMP': {
            items: [
                { image: './images/rssm.jpg', heading: 'Raja Shankar Shah Museum, Jabalpur, MP', paragraph: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
                { image: './images/dummy.png', heading: 'Shri Badal Bhoi State Tribal Museum, Chhindwara', subheading: 'Description 2', paragraph: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur' }
            ]
        },

        'INJH': {
            image: './images/birsaMunda.png',
            heading: 'Birsa Munda Meuseum',
            subheading: 'Ranchi, Jharkhand',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INGJ': {
            image: './images/dummy.jpg',
            heading: 'National Tribal Freedom Fighters Museum',
            subheading: 'Rajpipla, Gujarat',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INCT': {
            image: './images/dummy.jpg',
            heading: 'Shaheed Veer Narayan, Freedom Fighters Museum',
            subheading: 'Raipur, Chattisgarh',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INMN': {
            image: './images/dummy.jpg',
            heading: 'Heading for Area 3',
            subheading: 'Subheading for Area 3',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INMN': {
            image: './images/dummy.jpg',
            heading: 'Rani Gaidinlu, Freedom Fighters Museum',
            subheading: 'Senapati, Manipur',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INMZ': {
            image: './images/dummy.jpg',
            heading: 'Ropuiliani, Freedom Fighters Museum',
            subheading: 'Kelsih, Mizoram',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INTG': {
            image: './images/dummy.jpg',
            heading: 'Freedom Fighters Museum',
            subheading: 'Heyderabad, Telangana',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INAP': {
            image: './images/dummy.jpg',
            heading: 'Freedom Fighters Museum',
            subheading: 'Lammasingi, Andhra Pradesh',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INGA': {
            image: './images/dummy.jpg',
            heading: 'Freedom Fighters Museum',
            subheading: 'Ponda, Goa',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        'INKL': {
            image: './images/dummy.jpg',
            heading: 'Freedom Fighters Museum',
            subheading: 'Kozhikode, Kerala',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
    };
    
   
    const showCard = (content) => {
        cardImage.src = content.image;
        cardHeading.textContent = content.heading;
        cardSubheading.textContent = content.subheading;
        cardParagraph.textContent = content.paragraph;

        card.style.display = 'block';
        gridContainer.style.display = 'none'; // Hide grid container

        card.classList.remove('hide-card');
        card.classList.add('show-card');
        gridContainer.classList.remove('show-grid');
        gridContainer.classList.add('hide-grid');
    };

    const showGrid = (content) => {
        gridContainer.innerHTML = ''; // Clear previous content

        content.items.forEach(item => {
            const gridItem = document.createElement('div');
            gridItem.className = 'gridItem';
            gridItem.innerHTML = `
                <img src="${item.image}" alt="${item.heading}">
                <div class="gridItemText">
                    <h4>${item.heading}</h4>
                    
                    <p>${item.paragraph}</p>
                </div>
            `;
            gridContainer.appendChild(gridItem);
        });

         // Add animation classes
    gridContainer.classList.remove('hide-grid');
    gridContainer.classList.add('show-grid');
    card.classList.remove('show-card');
    card.classList.add('hide-card');

        card.style.display = 'none'; // Hide card
        gridContainer.style.display = 'grid'; // Show grid container
    };

    const hideContent = () => {
        card.style.display = 'none';
        gridContainer.style.display = 'none';
        currentContent = null;
        card.classList.remove('show-card');
        card.classList.add('hide-card');
        gridContainer.classList.remove('show-grid');
        gridContainer.classList.add('hide-grid');
    };

    const handleHover = (event, content) => {
        // Hide previously displayed content
        if (currentContent) {
            hideContent();
        }

        // Remove highlight from the previously highlighted element
        if (highlightedElement) {
            highlightedElement.classList.remove('highlighted');
        }

        // Show new content
        if (content.items) {
            showGrid(content);
        } else {
            showCard(content);
        }

        // Update the currently highlighted element
        highlightedElement = event.target;
        highlightedElement.classList.add('highlighted');
        currentContent = content; // Track the currently displayed content
    };

    Object.keys(areas).forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('mouseover', (event) => {
            handleHover(event, areas[id]);
        });
        element.addEventListener('mouseout', () => {
            // Optionally remove highlight on mouse out if needed
            // element.classList.remove('highlighted');
        });
    });

    // Show the default content (replace 'INMP' with the desired default area ID)
    const defaultArea = 'INMP';
    if (areas[defaultArea]) {
        handleHover({ target: document.getElementById(defaultArea) }, areas[defaultArea]);
    }

    // Hide or show card based on scroll direction and position relative to the header
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const headerBottom = header.getBoundingClientRect().bottom + scrollTop;
        scrollValueDisplay.textContent = `Scroll Value: ${scrollTop}`;

        if (scrollTop > headerBottom) {
            // Scrolling past the bottom of the header
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                // Scrolling down and past the threshold
                card.style.display = 'block';
                gridContainer.style.display = 'none'; // Hide grid container
            } else if (scrollTop < lastScrollTop && scrollTop > scrollThreshold) {
                // Scrolling up and past the threshold
                card.style.display = 'none';
                gridContainer.style.display = 'none'; // Hide grid container
            }
        } else {
            // Before the header's bottom, hide the card
            card.style.display = 'none';
            gridContainer.style.display = 'none'; // Hide grid container
        }

        lastScrollTop = scrollTop;
    });
});