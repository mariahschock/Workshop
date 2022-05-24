// IMPORT MODULES under test here:
// import { example } from '../example.js';
import { renderWorkshop, renderOption } from '../render-utils.js';

const test = QUnit.test;

test('renderWorkshop', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = `<div class="workshop"><h2>Defense Against the Dark Arts</h2></div>`;
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderWorkshop({
        id: 1,
        name: 'Defense Against the Dark Arts',
        participants: [{ name: 'Harry Potter', contact_info: 'hp@hogwarts.com' }],
    });

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});

test('renderOption', (expect) => {
    const expected = `<option value="1">Defense Against the Dark Arts</option>`;
    const actual = renderOption({
        id: 1,
        name: 'Defense Against the Dark Arts',
        participants: [{ name: 'Harry Potter', contact_info: 'hp@hogwarts.com' }],
    });
    expect.equal(actual.outerHTML, expected);
});
