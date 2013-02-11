define([
    'jasmine-jquery',
    'streamhub-deck',
    'streamhub-backbone'],
function (jasmine, DeckView, Hub) {
describe('DeckView', function () {
    
    it ("throws if constructed without a Hub.Collection", function () {
        expect(function () {
            new DeckView();
        }).toThrow();
        expect(function () {
            new DeckView({});
        }).toThrow();
        expect(function () {
            new DeckView({
                collection: []
            });
        }).toThrow();
    });

    describe ("when constructed with only a Hub.Collection", function () {
        var view;
        beforeEach(function () {
            this.view = new DeckView({
                collection: new Hub.Collection()
            });
        });
        it ("is defined", function () {
            expect(this.view).toBeDefined();
        });
        it ("has an el that is not in the DOM", function () {
            expect($(document).find(this.view.el).length).toBe(0);
        });
        it ("has an .el with the correct .className", function () {
            var view = this.view;
            expect(view.$el.is('.'+view.className)).toBe(true);
        });
        describe ("when .setElement is later called", function () {
            beforeEach(function () {
                setFixtures('<div id="env"></div>');
                this.view.setElement($('#env'));
            });
            it ("has an el in the DOM", function () {
                expect($(document).find(this.view.el).length).toBe(1);
            });
            describe ("when .render is called", renderView);
        });
    });

    describe ("when constructed with an .el and a Hub.Collection", function () {
        beforeEach(function () {
            setFixtures('<div id="env"></div>');
            this.view = new DeckView({
                collection: new Hub.Collection(),
                el: $('#env')
            });
        });
        it ("is defined", function () {
            expect(this.view).toBeDefined();
        });
        it ("has an element that is in the DOM", function () {
            expect($(document).find(this.view.el).length).toBe(1);
        });
        describe ("when .render is called", renderView);
    });

    function renderView () {
        beforeEach(function () {
            this.view.render();
        });
        it ("has a .el with the correct .className", function () {
            expect(this.view.$el.is('.'+this.view.className)).toBe(true);
        });
    }

    describe ("when .collection.setRemote is called after construction", function () {
        xit ("should display data from the remote Collection", function () {
        });
    });

    xdescribe ("when constructed using the initialNumToDisplay option", function () {
        beforeEach(function () {
            setFixtures('<div id="env"></div>');
            this.view = new DeckView({
                el: $('#env'),
                collection: new Hub.Collection(),
                initialNumToDisplay: 5
            });
        });
        describe ("when rendered", function () {
            it ("only has N images on first imagesLoaded event", function () {
                var initialImagesLoaded = false;
                runs(function () {
                    this.view.render();
                    this.view.$el.imagesLoaded(function () {
                        initialImagesLoaded = true;
                    });
                });
                waitsFor(function () {
                    return initialImagesLoaded;
                });
                runs(function () {
                    // check for only that many images?
                });
            });
        });
    });
}); 
});
