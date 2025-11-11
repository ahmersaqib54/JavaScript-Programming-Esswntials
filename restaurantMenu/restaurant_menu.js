const breakfastMenu = [
    'Pancakes - $12',
    'Eggs Benedict - $22.99',
    'Oatmeal - $21.99',
    'Frittata - $15'
];

const mainCourseMenu = [
    'Steak - $35',
    'Pasta - $24',
    'Burger - $18',
    'Salmon - $29'
];

const dessertMenu = [
    'Cake - $10',
    'Ice Cream - $8',
    'Pudding - $7',
    'Fruit Salad - $6'
];

// Display breakfast menu items
const breakfastMenuItemsHTML = breakfastMenu
    .map((item, index) => `<p>Item ${index + 1}: ${item}</p>`)
    .join('');
document.getElementById('breakfastMenuItems').innerHTML = breakfastMenuItemsHTML;
document.getElementById('breakfastTotalItems').innerHTML =
    `<strong>Total Items: ${breakfastMenu.length}</strong>`;

// Display main course menu items
let mainCourseItem = '';
mainCourseMenu.forEach((item, index) => {
  mainCourseItem += `<p>Item ${index + 1}: ${item}</p>`;
});
document.getElementById('maincourseMenuItems').innerHTML = mainCourseItem;
document.getElementById('maincourseTotalItems').innerHTML =
    `<strong>Total Items: ${mainCourseMenu.length}</strong>`;

// Display dessert menu items
let dessertItem = '';
for (let i = 0; i < dessertMenu.length; i++) {
  dessertItem += `<p>Item ${i + 1}: ${dessertMenu[i]}</p>`;
}
document.getElementById('dessertMenuItems').innerHTML = dessertItem;
document.getElementById('dessertTotalItems').innerHTML =
    `<strong>Total Items: ${dessertMenu.length}</strong>`;
