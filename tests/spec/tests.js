define(['jasmine-jquery'], function () {
describe('Test', function () {
    it ("Can have tests run", function () {
        expect(true).toBe(true);
    });
    it("Can do HTML tests",function(){
        var domId = 'hub-DeckView';
        setFixtures('<div id="'+domId+'"></container>');  
        $('#'+domId)
            .append('<li>So</li>')
            .append('<li>So</li>');
        expect($('#'+domId + ' li').length).toBe(2);  
    });
}); 
});
