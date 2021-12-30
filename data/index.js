// import ScreenConst from '../constants/ScreenConst';

import ScreenConst from '../constants/ScreenConst';

// const colors = [
//   '#dce5f1',
//   '#ebe8de',
//   '#ffece7',
//   '#eafbdd',
//   '#f4f3fe',
//   '#deccf0',
//   '#deccf0',
// ];

// export default {
//   products: [
//     {
//       id: '14',
//       categoryid: '3',
//       productname: 'Pepperoni Pizza',
//       image: require('../resources/assets/asd.png'),
//       price: '9',
//       rating: '3.7',
//       description:
//         'ranch is a better condiment for pizza than it is for a salad. It makes more sense in a world of dense carbs and rich tomato than it ever would atop bitter lettuce and crunchy carrots',
//       addons: [
//         {title: 'Fries + Fresh Lime', price: '25'},
//         {title: 'Coleslaw', price: '12'},
//         {title: 'Corn on the Cob', price: '13'},
//         {title: 'Cheese Slice', price: '5'},
//         {title: 'Dinner Roll', price: '10'},
//       ],
//       suggestionsOnCombo: [
//         {title: 'Fries + Pepsi', price: '50'},
//         {title: '2 jumbo Fries', price: '32'},
//         {title: '1 Chicken Pc + Pepsi', price: '42'},
//       ],
//     },

//     {
//       id: '5',
//       categoryid: '1',
//       productname: 'Hot dog',
//       image: require('../resources/images/FastFood5.jpg'),
//       price: '3',
//       rating: '4',
//       description:
//         'A hot dog is a food consisting of a grilled or steamed sausage served in the slit of a partially sliced bun. It can also refer to the sausage itself',
//     },
//     {
//       id: '6',
//       categoryid: '1',
//       productname: 'Bacon',
//       image: require('../resources/images/FastFood6.jpg'),
//       price: '5',
//       rating: '3.4',

//       description:
//         'Bacon is a type of salt-cured pork made from various cuts, typically from the pork belly or from the less fatty back cuts. It is eaten on its own',
//     },
//     {
//       id: '4',
//       categoryid: '1',
//       productname: 'Taco',
//       image: require('../resources/images/FastFood4.jpg'),
//       price: '4',
//       rating: '3.5',
//       description:
//         'A taco is a traditional Mexican dish consisting of a small hand-sized corn or wheat tortilla topped with a filling. The tortilla is then folded around the filling and eaten by hand',
//     },

//     {
//       id: '1',
//       categoryid: '1',
//       productname: 'Onion ring',
//       image: require('../resources/images/FastFood1.jpg'),
//       price: '5',
//       rating: '3.8',
//       description:
//         'An onion ring is a form of appetizer or side dish commonly found in the United States, Canada, United Kingdom, Ireland, Australia, New Zealand, South Africa, and some parts of Asia,',
//     },
//     {
//       id: '2',
//       categoryid: '1',
//       productname: 'Pretzel',
//       image: require('../resources/images/FastFood2.jpg'),
//       price: '3',
//       rating: '4.5',
//       isRecommended: false,
//       description:
//         'Pretzel, a brittle, glazed-and-salted cracker of German or Alsatian origin. Made from a rope of dough typically fashioned into the shape of a loose knot',
//     },
//     {
//       id: '3',
//       categoryid: '1',
//       productname: 'Burrito',
//       image: require('../resources/images/FastFood3.jpg'),
//       price: '6',
//       rating: '3.9',
//       description:
//         'A burrito is a dish in Mexican and Tex-Mex cuisine consisting of a flour tortilla wrapped into a sealed cylindrical shape around various ingredients',
//     },
//     {
//       id: '10',
//       categoryid: '2',
//       productname: 'CRUNCH BURGER',
//       image: require('../resources/assets/b4.png'),
//       price: '10',
//       rating: '3.9',
//       isRecommended: true,
//       description:
//         'Crunch burger is one of the most recent additions to the KFC menu. Crispier and crunchier than the regular KFC burger, and almost as spicy as the KFC Zinger, the Crunch Burger is outstanding',
//     },

//     {
//       id: '7',
//       categoryid: '2',
//       productname: 'BEEF BURGER',
//       image: require('../resources/assets/burger-10917.png'),
//       price: '8',
//       rating: '3.6',
//       description:
//         'A hamburger (also burger for short) is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun',
//     },
//     {
//       id: '8',
//       categoryid: '2',
//       productname: 'CHICKEN BURGER',
//       image: require('../resources/assets/b2.png'),
//       price: '12',
//       rating: '3.8',
//       isRecommended: true,
//       description:
//         'Crispy seasoned chicken breast, topped with mandatory melted cheese and piled onto soft rolls with onion, avocado, lettuce, tomato and garlic mayo. Quick to make for a midweek meal,',
//     },
//     {
//       id: '9',
//       categoryid: '2',
//       productname: 'CHICKEN B.B.Q BURGER',
//       image: require('../resources/assets/b3.png'),
//       price: '8',
//       rating: '4.1',
//       description:
//         "at least as compared to such sundry first cousins as grilled and/or smoked ribs, brisket or pulled pork. ... It's chicken, after all, and it wears that lean protein halo",
//     },

//     {
//       id: '11',
//       categoryid: '2',
//       productname: 'Cheeseburger Deluxe',
//       image: require('../resources/assets/b5.png'),
//       price: '12',
//       rating: '3.3',
//       description:
//         'cheeseburger is now made deluxe! The same juicy beef patty covered with a slice of cheese and ketchup, mustard, mayonnaise, fresh onions and pickles all wrapped in a fresh bun but with an extra slice of tomato and crunchy lettuc',
//     },
//     {
//       id: '12',
//       categoryid: '2',
//       productname: 'Mozzarella Burger Deluxe',
//       image: require('../resources/images/Burgers6.jpg'),
//       price: '13',
//       rating: '4.2',
//       isRecommended: true,
//       description:
//         'opped with marinara sauce and mozzarella cheese. ... Deluxe burgers served with lettuce, tomato, cole slaw, pickle and french fries. Substitute any side instead',
//     },
//     {
//       id: '13',
//       categoryid: '3',
//       productname: 'Cheese & Pepperoni',
//       image: require('../resources/images/pizza1.jpg'),
//       price: '10',
//       rating: '3.6',
//       isRecommended: true,
//       description:
//         "pepperoni pizza tastes as good as your favorite pizza place! It's so good, you'll be ... Food And Drink. •. Pizza ... Classic Hawaiian",
//     },

//     {
//       id: '15',
//       categoryid: '3',
//       productname: 'Chicken Fajita',
//       image: require('../resources/images/pizza3.jpg'),
//       price: '12',
//       rating: '3.2',
//       description:
//         'pizza topped with chicken, bell peppers, onions and salsa. Another family favorite that has been adapted from a Pillsbury Bake-off recipe.',
//     },
//     {
//       id: '16',
//       categoryid: '3',
//       productname: 'Veggie Lover',
//       image: require('../resources/images/pizza4.jpg'),
//       price: '10',
//       rating: '4.8',
//       isRecommended: true,
//       description:
//         'so mix and match your favorites. At the chains, vegetable pizzas tend to have fewer calories and less fat—and there are a surprising number of decent choices.',
//     },
//     {
//       id: '17',
//       categoryid: '3',
//       productname: 'Super Supreme',
//       image: require('../resources/images/pizza5.jpg'),
//       price: '17',
//       rating: '3.2',
//       description:
//         'Enjoy the taste of true Pizza Royalty. Nine tasty toppings: ham, pepperoni, Italian sausage, beef, onions, mushrooms, green peppers, black olives, pork.',
//     },
//     {
//       id: '18',
//       categoryid: '3',
//       productname: 'Fajita Sicilian',
//       image: require('../resources/images/pizza6.jpg'),
//       price: '20',
//       rating: '3.4',
//       description:
//         'Fajita Pizza is tasty and delicious pizza. Chicken is marinated with fajita sauce mixture and cooked. Then topped with pizza sauce, vegetables, olives, mushrooms, cheese & herbs on pizza dough and baked',
//     },
//     {
//       id: '19',
//       categoryid: '4',
//       productname: 'Beef Mayo Roll',
//       image: require('../resources/images/Roll1.jpg'),
//       price: '15',
//       rating: '3.8',
//       description:
//         'Mayo Garlic Roll is tasty roll. Chicken is marinated with paste & spices and cooked with marination. Then filled in parathay with onion & mayo',
//     },
//     {
//       id: '20',
//       categoryid: '4',
//       productname: 'Chicken Cheese Roll',
//       image: require('../resources/images/Roll2.jpg'),
//       price: '10',
//       rating: '3.5',
//       description:
//         'A cheese roll is a snack food similar to Welsh rarebit, but created by covering a slice of bread in a prepared filling consisting mainly of grated or sliced cheese',
//     },
//     {
//       id: '21',
//       categoryid: '4',
//       productname: 'Chicken Juicy Roll',
//       image: require('../resources/images/Roll3.jpg'),
//       price: '12',
//       rating: '3.8',
//       description:
//         'Drizzle some lemon juice all over the chicken pieces, garnish with some sliced onions, cucumber and chopped coriander leaves.',
//     },
//     {
//       id: '22',
//       categoryid: '4',
//       productname: 'Chicken Roll',
//       image: require('../resources/images/Roll4.jpg'),
//       price: '12',
//       rating: '3.5',
//       description:
//         ' chicken, and keep it aside. Heat a pan, saute onion, and curry leaves. Add salt, so that onion will be softned faster. Once onion turns light brown, add ginger garlic paste to it, and saute.',
//     },
//     {
//       id: '23',
//       categoryid: '5',
//       productname: 'Gnocchi',
//       image: require('../resources/images/Pasta1.jpg'),
//       price: '10',
//       rating: '4',

//       description:
//         'Gnocchi are a variety of Pasta consisting of various thick, small, and soft dough dumplings that may be made from semolina, ordinary wheat flour, egg, cheese, potato',
//     },
//     {
//       id: '24',
//       categoryid: '5',
//       productname: 'Tagliatelle',
//       image: require('../resources/images/Pasta2.jpg'),
//       price: '15',
//       rating: '4.7',
//       isRecommended: true,
//       description:
//         'Tagliatelle are a traditional type of Pasta from the Emilia-Romagna and Marche regions of Italy. Individual pieces of tagliatelle are long, flat ribbons that are similar in shape ',
//     },
//     {
//       id: '25',
//       categoryid: '5',
//       productname: 'Cavatelli',
//       image: require('../resources/images/Pasta3.jpg'),
//       price: '10',
//       rating: '4.8',
//       description:
//         'Cavatelli are small Pasta shells from eggless semolina dough that look like miniature hot dog buns, commonly cooked with garlic and broccoli or broccoli rabe',
//     },
//     {
//       id: '26',
//       categoryid: '5',
//       productname: 'Ravioli',
//       image: require('../resources/images/Pasta4.jpg'),
//       price: '17',
//       rating: '3.2',
//       description:
//         'Ravioli are a type of Pasta comprising a filling enveloped in thin Pasta dough. Usually served in broth or with a sauce, they originated as a traditional food in Italian cuisine. Ravioli are commonly square,',
//     },
//     {
//       id: '27',
//       categoryid: '5',
//       productname: 'Macaroni',
//       image: require('../resources/images/Pasta5.jpg'),
//       price: '13',
//       rating: '3.4',
//       description:
//         'Macaroni is dry Pasta shaped like narrow tubes. Made with durum wheat, macaroni is commonly cut in short lengths; curved macaroni may be referred to as elbow macaroni. Some home machines can make macaroni shapes',
//     },
//     {
//       id: '28',
//       categoryid: '5',
//       productname: 'Farfalle',
//       image: require('../resources/images/Pasta6.jpg'),
//       price: '20',
//       rating: '3.8',
//       description:
//         'Farfalle are a type of Pasta commonly known as bow-tie Pasta or butterfly Pasta. The name is derived from the Italian word farfalle. In the Italian city of Modena, farfalle are known as strichetti. A larger variation of farfalle is known as farfalloni',
//     },
//     {
//       id: '29',
//       categoryid: '5',
//       productname: 'Orecchiette',
//       image: require('../resources/images/Pasta7.jpg'),
//       price: '14',
//       rating: '3.5',
//       description:
//         "The word 'orecchiette' means 'little ears' Some food historians argue that this Pasta arrived in Southern Italy from Provence during the 13th century with the Angevins. Orecchiette",
//     },
//   ],
//   topping: [
//     {
//       productid: '1',
//       topping: 'cheese',
//       image: require('../resources/images/add1.jpg'),
//       price: '1.5',
//     },
//     {
//       productid: '1',
//       topping: 'butter',
//       image: require('../resources/images/add2.jpg'),
//       price: '0.5',
//     },
//     {
//       productid: '1',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '2',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '2',
//       topping: 'corn salad',
//       image: require('../resources/images/add5.jpg'),
//       price: '1.2',
//     },
//     {
//       productid: '2',
//       topping: 'pepperoni',
//       image: require('../resources/images/add6.jpg'),
//       price: '1.4',
//     },
//     {
//       productid: '3',
//       topping: 'olivier salad',
//       image: require('../resources/images/add7.jpg'),
//       price: '1.6',
//     },
//     {
//       productid: '3',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '3',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '4',
//       topping: 'corn salad',
//       image: require('../resources/images/add5.jpg'),
//       price: '1.2',
//     },
//     {
//       productid: '4',
//       topping: 'pepperoni',
//       image: require('../resources/images/add6.jpg'),
//       price: '1.4',
//     },
//     {
//       productid: '4',
//       topping: 'olivier salad',
//       image: require('../resources/images/add7.jpg'),
//       price: '1.6',
//     },
//     {
//       productid: '5',
//       topping: 'cheese',
//       image: require('../resources/images/add1.jpg'),
//       price: '1.5',
//     },
//     {
//       productid: '5',
//       topping: 'butter',
//       image: require('../resources/images/add2.jpg'),
//       price: '0.5',
//     },
//     {
//       productid: '5',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '6',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '6',
//       topping: 'corn salad',
//       image: require('../resources/images/add5.jpg'),
//       price: '1.2',
//     },
//     {
//       productid: '6',
//       topping: 'pepperoni',
//       image: require('../resources/images/add6.jpg'),
//       price: '1.4',
//     },
//     {
//       productid: '7',
//       topping: 'olivier salad',
//       image: require('../resources/images/add7.jpg'),
//       price: '1.6',
//     },
//     {
//       productid: '7',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '7',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '8',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '8',
//       topping: 'corn salad',
//       image: require('../resources/images/add5.jpg'),
//       price: '1.2',
//     },
//     {
//       productid: '8',
//       topping: 'pepperoni',
//       image: require('../resources/images/add6.jpg'),
//       price: '1.4',
//     },
//     {
//       productid: '9',
//       topping: 'olivier salad',
//       image: require('../resources/images/add7.jpg'),
//       price: '1.6',
//     },
//     {
//       productid: '9',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '9',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '10',
//       topping: 'corn salad',
//       image: require('../resources/images/add5.jpg'),
//       price: '1.2',
//     },
//     {
//       productid: '10',
//       topping: 'pepperoni',
//       image: require('../resources/images/add6.jpg'),
//       price: '1.4',
//     },
//     {
//       productid: '10',
//       topping: 'olivier salad',
//       image: require('../resources/images/add7.jpg'),
//       price: '1.6',
//     },
//     {
//       productid: '11',
//       topping: 'cheese',
//       image: require('../resources/images/add1.jpg'),
//       price: '1.5',
//     },
//     {
//       productid: '11',
//       topping: 'butter',
//       image: require('../resources/images/add2.jpg'),
//       price: '0.5',
//     },
//     {
//       productid: '11',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '12',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '12',
//       topping: 'cheese',
//       image: require('../resources/images/add1.jpg'),
//       price: '1.5',
//     },
//     {
//       productid: '12',
//       topping: 'butter',
//       image: require('../resources/images/add2.jpg'),
//       price: '0.5',
//     },
//     {
//       productid: '13',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '13',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '13',
//       topping: 'corn salad',
//       image: require('../resources/images/add5.jpg'),
//       price: '1.2',
//     },
//     {
//       productid: '14',
//       topping: 'pepperoni',
//       image: require('../resources/images/add6.jpg'),
//       price: '1.4',
//     },
//     {
//       productid: '14',
//       topping: 'olivier salad',
//       image: require('../resources/images/add7.jpg'),
//       price: '1.6',
//     },
//     {
//       productid: '14',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '15',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '15',
//       topping: 'corn salad',
//       image: require('../resources/images/add5.jpg'),
//       price: '1.2',
//     },
//     {
//       productid: '15',
//       topping: 'pepperoni',
//       image: require('../resources/images/add6.jpg'),
//       price: '1.4',
//     },
//     {
//       productid: '16',
//       topping: 'olivier salad',
//       image: require('../resources/images/add7.jpg'),
//       price: '1.6',
//     },
//     {
//       productid: '16',
//       topping: 'cheese',
//       image: require('../resources/images/add1.jpg'),
//       price: '1.5',
//     },
//     {
//       productid: '16',
//       topping: 'butter',
//       image: require('../resources/images/add2.jpg'),
//       price: '0.5',
//     },
//     {
//       productid: '17',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '17',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '17',
//       topping: 'corn salad',
//       image: require('../resources/images/add5.jpg'),
//       price: '1.2',
//     },
//     {
//       productid: '18',
//       topping: 'pepperoni',
//       image: require('../resources/images/add6.jpg'),
//       price: '1.4',
//     },
//     {
//       productid: '18',
//       topping: 'olivier salad',
//       image: require('../resources/images/add7.jpg'),
//       price: '1.6',
//     },
//     {
//       productid: '18',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '19',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '19',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '19',
//       topping: 'corn salad',
//       image: require('../resources/images/add5.jpg'),
//       price: '1.2',
//     },
//     {
//       productid: '20',
//       topping: 'pepperoni',
//       image: require('../resources/images/add6.jpg'),
//       price: '1.4',
//     },
//     {
//       productid: '20',
//       topping: 'olivier salad',
//       image: require('../resources/images/add7.jpg'),
//       price: '1.6',
//     },
//     {
//       productid: '20',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '21',
//       topping: 'olivier salad',
//       image: require('../resources/images/add7.jpg'),
//       price: '1.6',
//     },
//     {
//       productid: '21',
//       topping: 'cheese',
//       image: require('../resources/images/add1.jpg'),
//       price: '1.5',
//     },
//     {
//       productid: '21',
//       topping: 'butter',
//       image: require('../resources/images/add2.jpg'),
//       price: '0.5',
//     },
//     {
//       productid: '21',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '22',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '22',
//       topping: 'cheese',
//       image: require('../resources/images/add1.jpg'),
//       price: '1.5',
//     },
//     {
//       productid: '22',
//       topping: 'butter',
//       image: require('../resources/images/add2.jpg'),
//       price: '0.5',
//     },
//     {
//       productid: '23',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '23',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '23',
//       topping: 'corn salad',
//       image: require('../resources/images/add5.jpg'),
//       price: '1.2',
//     },
//     {
//       productid: '24',
//       topping: 'pepperoni',
//       image: require('../resources/images/add6.jpg'),
//       price: '1.4',
//     },
//     {
//       productid: '24',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '24',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '25',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '25',
//       topping: 'corn salad',
//       image: require('../resources/images/add5.jpg'),
//       price: '1.2',
//     },
//     {
//       productid: '25',
//       topping: 'pepperoni',
//       image: require('../resources/images/add6.jpg'),
//       price: '1.4',
//     },
//     {
//       productid: '26',
//       topping: 'olivier salad',
//       image: require('../resources/images/add7.jpg'),
//       price: '1.6',
//     },
//     {
//       productid: '26',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '26',
//       topping: 'olivier salad',
//       image: require('../resources/images/add7.jpg'),
//       price: '1.6',
//     },
//     {
//       productid: '27',
//       topping: 'cheese',
//       image: require('../resources/images/add1.jpg'),
//       price: '1.5',
//     },
//     {
//       productid: '27',
//       topping: 'butter',
//       image: require('../resources/images/add2.jpg'),
//       price: '0.5',
//     },
//     {
//       productid: '27',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '28',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '28',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '28',
//       topping: 'crisp fried prawns',
//       image: require('../resources/images/add3.jpg'),
//       price: '1',
//     },
//     {
//       productid: '29',
//       topping: 'Cucumber Salad',
//       image: require('../resources/images/add4.jpg'),
//       price: '1.9',
//     },
//     {
//       productid: '29',
//       topping: 'corn salad',
//       image: require('../resources/images/add5.jpg'),
//       price: '1.2',
//     },
//     {
//       productid: '29',
//       topping: 'pepperoni',
//       image: require('../resources/images/add6.jpg'),
//       price: '1.4',
//     },
//   ],
// };

// export const categories = [
//   {
//     id: '1',
//     name: 'Noodles',
//     image: require('../resources/assets/cnoodles.png'),
//     bgcolor: colors[0],
//   },
//   {
//     id: '2',
//     name: 'Burgers',
//     image: require('../resources/assets/cburger.png'),
//     bgcolor: colors[1],
//   },
//   {
//     id: '3',
//     name: 'Pastas',
//     image: require('../resources/assets/cpastas.png'),
//     bgcolor: colors[2],
//   },
//   {
//     id: '4',
//     name: 'Chinese',
//     image: require('../resources/assets/cchinese.png'),
//     bgcolor: colors[3],
//   },
//   {
//     id: '5',
//     name: 'Steaks',
//     image: require('../resources/assets/csteaks.png'),
//     bgcolor: colors[3],
//   },
//   {
//     id: '6',
//     name: 'Sandwich',
//     image: require('../resources/assets/csandwiches.png'),
//     bgcolor: colors[3],
//   },
// ];

// export const orderStatus = [
//   {
//     id: '1',
//     orderNo: 'Order NO: 99121',
//     orderDate: '25 Jan 2021, 03:00 PM',
//     orderPrice: 'Total: SAR 115.20',
//     orderStatus: 'Pending',

//     orderImage: require('../resources/assets/asd.png'),
//   },
//   // {
//   //   id: '2',
//   //   orderNo: 'Order NO: 99122',
//   //   orderDate: '25 Jan 2021, 03:00 PM',
//   //   orderPrice: 'Total: SAR 180.50',
//   //   orderStatus: 'On Route',
//   //   orderImage: require('../resources/assets/Chinese.png')

//   // },
//   // {
//   //   id: '3',
//   //   orderNo: 'Order NO: 99123',
//   //   orderDate: '25 Jan 2021, 03:00 PM',
//   //   orderPrice: 'Total: SAR 120.00',
//   //   orderStatus: 'Pending',
//   //   orderImage: require('../resources/assets/Burgers.png')

//   // },
//   // {
//   //   id: '4',
//   //   orderNo: 'Order NO: 99124',
//   //   orderDate: '25 Jan 2021, 03:00 PM',
//   //   orderPrice: 'Total: SAR 120.00',
//   //   orderStatus: 'On Route',
//   //   orderImage: require('../resources/images/Roll3.jpg')

//   // },
// ];

// export const orderHistory = [
//   {
//     id: '1',
//     orderNo: 'Order NO: 99190',
//     orderDate: '25 Jan 2021, 03:00 PM',
//     orderPrice: 'Total: SAR 112.20',
//     orderStatus: 'Delivered',
//     orderImage: require('../resources/assets/cchinese.png'),
//   },
//   {
//     id: '2',
//     orderNo: 'Order NO: 99890',
//     orderDate: '25 Jan 2021, 03:00 PM',
//     orderPrice: 'Total: SAR 180.50',
//     orderStatus: 'Delivered',
//     orderImage: require('../resources/assets/cpastas.png'),
//     orderScheduleTime: 'Scheduled for tomorrow 10:00 AM',
//   },
//   {
//     id: '3',
//     orderNo: 'Order NO: 98923',
//     orderDate: '25 Jan 2021, 03:00 PM',
//     orderPrice: 'Total: SAR 120.00',
//     orderStatus: 'Delivered',
//     orderImage: require('../resources/assets/cburger.png'),
//   },
//   {
//     id: '4',
//     orderNo: 'Order NO: 98324',
//     orderDate: '25 Jan 2021, 03:00 PM',
//     orderPrice: 'Total: SAR 120.00',
//     orderStatus: 'Cancelled',
//     orderImage: require('../resources/assets/cnoodles.png'),
//   },
// ];

// export const reviews = [
//   {
//     name: 'Akhlak Khan',
//     rating: 4,
//     profilePic:
//       'https://image.freepik.com/free-photo/african-american-man-with-blue-t-shirt-yellow-background-thinking-idea-while-looking-up_1368-26199.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Sara Khan',
//     rating: 4,
//     profilePic:
//       'https://i.pinimg.com/originals/1a/db/03/1adb03f05ee14149a4f1c71be14a4175.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Akhlak Khan',
//     rating: 4,
//     profilePic:
//       'https://image.freepik.com/free-photo/african-american-man-with-blue-t-shirt-yellow-background-thinking-idea-while-looking-up_1368-26199.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Sara Khan',
//     rating: 4,
//     profilePic:
//       'https://i.pinimg.com/originals/1a/db/03/1adb03f05ee14149a4f1c71be14a4175.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Akhlak Khan',
//     rating: 4,
//     profilePic:
//       'https://image.freepik.com/free-photo/african-american-man-with-blue-t-shirt-yellow-background-thinking-idea-while-looking-up_1368-26199.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Sara Khan',
//     rating: 4,
//     profilePic:
//       'https://i.pinimg.com/originals/1a/db/03/1adb03f05ee14149a4f1c71be14a4175.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Akhlak Khan',
//     rating: 4,
//     profilePic:
//       'https://image.freepik.com/free-photo/african-american-man-with-blue-t-shirt-yellow-background-thinking-idea-while-looking-up_1368-26199.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Sara Khan',
//     rating: 4,
//     profilePic:
//       'https://i.pinimg.com/originals/1a/db/03/1adb03f05ee14149a4f1c71be14a4175.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Akhlak Khan',
//     rating: 4,
//     profilePic:
//       'https://image.freepik.com/free-photo/african-american-man-with-blue-t-shirt-yellow-background-thinking-idea-while-looking-up_1368-26199.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Sara Khan',
//     rating: 4,
//     profilePic:
//       'https://i.pinimg.com/originals/1a/db/03/1adb03f05ee14149a4f1c71be14a4175.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Akhlak Khan',
//     rating: 4,
//     profilePic:
//       'https://image.freepik.com/free-photo/african-american-man-with-blue-t-shirt-yellow-background-thinking-idea-while-looking-up_1368-26199.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Sara Khan',
//     rating: 4,
//     profilePic:
//       'https://i.pinimg.com/originals/1a/db/03/1adb03f05ee14149a4f1c71be14a4175.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Akhlak Khan',
//     rating: 4,
//     profilePic:
//       'https://image.freepik.com/free-photo/african-american-man-with-blue-t-shirt-yellow-background-thinking-idea-while-looking-up_1368-26199.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Sara Khan',
//     rating: 4,
//     profilePic:
//       'https://i.pinimg.com/originals/1a/db/03/1adb03f05ee14149a4f1c71be14a4175.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Akhlak Khan',
//     rating: 4,
//     profilePic:
//       'https://image.freepik.com/free-photo/african-american-man-with-blue-t-shirt-yellow-background-thinking-idea-while-looking-up_1368-26199.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Sara Khan',
//     rating: 4,
//     profilePic:
//       'https://i.pinimg.com/originals/1a/db/03/1adb03f05ee14149a4f1c71be14a4175.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Akhlak Khan',
//     rating: 4,
//     profilePic:
//       'https://image.freepik.com/free-photo/african-american-man-with-blue-t-shirt-yellow-background-thinking-idea-while-looking-up_1368-26199.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Sara Khan',
//     rating: 4,
//     profilePic:
//       'https://i.pinimg.com/originals/1a/db/03/1adb03f05ee14149a4f1c71be14a4175.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Akhlak Khan',
//     rating: 4,
//     profilePic:
//       'https://image.freepik.com/free-photo/african-american-man-with-blue-t-shirt-yellow-background-thinking-idea-while-looking-up_1368-26199.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Sara Khan',
//     rating: 4,
//     profilePic:
//       'https://i.pinimg.com/originals/1a/db/03/1adb03f05ee14149a4f1c71be14a4175.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Akhlak Khan',
//     rating: 4,
//     profilePic:
//       'https://image.freepik.com/free-photo/african-american-man-with-blue-t-shirt-yellow-background-thinking-idea-while-looking-up_1368-26199.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
//   {
//     name: 'Sara Khan',
//     rating: 4,
//     profilePic:
//       'https://i.pinimg.com/originals/1a/db/03/1adb03f05ee14149a4f1c71be14a4175.jpg',
//     review: 'Truly love the burger and it to yummy loved it thanks',
//   },
// ];

// export const cartCalculations = [
//   {
//     title: 'Sub Total',
//     amount: 75,
//     currency: 'SAR',
//   },
//   {
//     title: 'Discount',
//     amount: 5,
//     currency: 'SAR',
//   },
//   {
//     title: 'Standard Shipping',
//     amount: 50,
//     currency: 'SAR',
//   },
// ];

// export const shippingAddress = [
//   {
//     id: 1,
//     title: 'Work',
//     location: 'Al Kurnaysh Road, Ash Shati, Quartz, 4th Floor, Jeddah, 23412.',
//     isSelected: true,
//   },
// ];

// export const paymentMethods = [
//   {
//     id: 1,
//     title: 'Master Card',
//     image: require('../resources/assets/Mastercard.png'),
//     isSelected: true,
//   },
//   {
//     id: 2,
//     title: 'Mada',
//     image: require('../resources/assets/mada.png'),
//     isSelected: false,
//   },
//   {
//     id: 3,
//     title: 'Credit Card',
//     image: require('../resources/assets/cc.png'),
//     isSelected: false,
//   },
// ];

// export const preferedTimings = [
//   {
//     title: 'Morning',
//     isSelected: true,
//   },
//   {
//     title: 'Evening',
//     isSelected: false,
//   },
// ];

export const customerSupport = [
  {
    title: 'My Account',
    image: require('../resources/assets/MyAccount.png'),
    navigateToScreen: ScreenConst.myAccount,
  },
  // {
  //   title: 'Safety Concerns',
  //   image: require('../resources/assets/surface1.png'),
  //   navigateToScreen: ScreenConst.promotionSupport,
  // },
  {
    title: 'Make a Payment',
    image: require('../resources/assets/Payment.png'),
    navigateToScreen: ScreenConst.makingPaymentSupport,
  },
  {
    title: 'Promotions',
    image: require('../resources/assets/Promo.png'),
    navigateToScreen: ScreenConst.promotionSupport,
  },
  {
    title: 'My Support Requests',
    image: require('../resources/assets/Mysupportchanges.png'),
    navigateToScreen: ScreenConst.mySupportTickets,
  },
  {
    title: 'FAQ',
    image: require('../resources/assets/help.png'),
    navigateToScreen: ScreenConst.FAQSupport,
  },
];

export const myAccount = [
  {
    title: 'Update account information',
    navigateToScreen: ScreenConst.updateAccountInfo,
  },
  {
    title: 'My OTP code did not work',
    navigateToScreen: ScreenConst.OtpCodeDidntWork,
  },
  {
    title: 'Can I use other number for login',
    navigateToScreen: ScreenConst.cantSignUp,
  },
  {
    title: 'I cant signup using phone number',
    navigateToScreen: ScreenConst.canIUseOtherNumber,
  },
];

export const promotions = [
  {
    title: 'Did not recieve promotion code',
    navigateToScreen: ScreenConst.DidntRecievePromoCode,

  },
  {
    title: 'I did not get my promotion discount ',
    navigateToScreen: ScreenConst.DidntGetMyPromoDiscount,

  },
  {
    title: 'How next promotion will come',
    navigateToScreen: ScreenConst.HowNextPromoWillCome,

  },
];

// export const cartItems = [
//   {
//     id: '14',
//     categoryid: '3',
//     productname: 'Pepperoni Pizza',
//     image: require('../resources/assets/asd.png'),
//     price: '9',
//     rating: '3.7',
//     description:
//       'ranch is a better condiment for pizza than it is for a salad. It makes more sense in a world of dense carbs and rich tomato than it ever would atop bitter lettuce and crunchy carrots',
//   },
//   {
//     id: '9',
//     categoryid: '2',
//     productname: 'CHICKEN B.B.Q BURGER',
//     image: require('../resources/assets/b3.png'),
//     price: '8',
//     rating: '4.1',
//     description:
//       "at least as compared to such sundry first cousins as grilled and/or smoked ribs, brisket or pulled pork. ... It's chicken, after all, and it wears that lean protein halo",
//   },
// ];

export const makingAPayment = [
  {
    title: 'Add or delete payment method.',
    navigateToScreen: ScreenConst.AddOrDeletePaymentMethod,
  },
  {
    title: 'My payment was declined',
    navigateToScreen: ScreenConst.MyPaymentWasDeclined,
  },
  {
    title: 'The checkout button does not work',
    navigateToScreen: ScreenConst.CheckoutButtonDoesntWork,
  },
  // {
  //   title: 'Can you add another payment method',
  // },
  {
    title: 'Which payment methods are available',
    navigateToScreen: ScreenConst.PaymentMethodsAvailable,
  },
];


export const FAQ = [
  {
    title: 'What is pick-up?',
    navigateToScreen: ScreenConst.WhatIsPickup,
  },
  {
    title: `I can't enter my address`,
    navigateToScreen: ScreenConst.CantEnterMyAddress,
  },
  {
    title: 'Order on multiple restaurants',
    navigateToScreen: ScreenConst.OrderOnMultipleRestaurants,
  },
  {
    title: 'Will meals be labelled?',
    navigateToScreen: ScreenConst.WillMealsBeLabelled,
  },
];

// export const supportIssues = [
//   {
//     title: 'Support Issue 1',
//     navigateToScreen: ScreenConst.mySupportTickets,
//   },
//   {
//     title: 'Support Issue 2',
//     navigateToScreen: ScreenConst.mySupportTickets,
//   },
//   {
//     title: 'Support Issue 3',
//     navigateToScreen: ScreenConst.mySupportTickets,
//   },
// ];

// export const branches = [
//   {
//     coordinate: {latitude: 24.860732, longitude: 67.001122},
//     branchName: 'MC Donalds Bahadurabad',
//     branchLocation: 'Bahadurabad',
//     branchID: '1',
//     image: require('../resources/images/branch1.jpeg'),
//   },
//   {
//     branchName: 'MC Donalds',
//     branchID: '2',
//     branchLocation: 'Saddar',
//     coordinate: {latitude: 24.861312, longitude: 67.003132},
//     image: require('../resources/images/branch2.jpeg'),
//   },
//   {
//     branchName: 'MC Donalds Shahraefaisal',
//     branchID: '3',
//     branchLocation: 'Shahra-e-faisal',
//     coordinate: {latitude: 24.860214, longitude: 67.00019},
//     image: require('../resources/images/branch3.jpeg'),
//   },
//   {
//     branchName: 'MC Donalds Gulshan',
//     branchID: '4',
//     coordinate: {latitude: 24.860214, longitude: 67.00319},
//     branchLocation: 'Gulshan-e-Iqbal',
//     image: require('../resources/images/branch1.jpeg'),
//   },

//   {
//     coordinate: {latitude: 24.260732, longitude: 67.001122},
//     branchName: 'MC Donalds Bahadurabad',
//     branchLocation: 'Bahadurabad',
//     branchID: '1',
//     image: require('../resources/images/branch1.jpeg'),
//   },

//   {
//     coordinate: {latitude: 25.860732, longitude: 67.001122},
//     branchName: 'MC Donalds Bahadurabad',
//     branchLocation: 'Bahadurabad',
//     branchID: '1',
//     image: require('../resources/images/branch1.jpeg'),
//   },

//   {
//     coordinate: {latitude: 26.860732, longitude: 67.001122},
//     branchName: 'MC Donalds Bahadurabad',
//     branchLocation: 'Bahadurabad',
//     branchID: '1',
//     image: require('../resources/images/branch1.jpeg'),
//   },
// ];
