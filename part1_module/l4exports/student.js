// const students = ["su su", "yu yu", "ma ma"];
// console.log(students);

// -------------------------------------------------------------

module.exports = "Welcome Mandalay";

// -------------------------------------------------------------

const girls = ["su su", "yu yu", "ma ma"];
module.exports = girls;

// -------------------------------------------------------------

const students = ["nyi nyi", "mg mg", "ma ma", "hla hla"];
const ages = [10, 5, 4, 8];

// module.exports = students;
// module.exports = ages; //overwrite

module.exports = {
    students : students,
    ages : ages
}

module.exports = {
    students,
    ages
};

