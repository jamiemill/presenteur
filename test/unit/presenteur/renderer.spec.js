var chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    path = require('path'),
    ROOT = path.resolve(__dirname + '/../../../'),
    LIB = ROOT + '/lib/',
    TEST = ROOT + '/test/',
    renderer = require(LIB + 'presenteur/renderer');

chai.use(require('sinon-chai'));

describe('Renderer', function() {

    var rend,
        stdout;

    beforeEach(function() {
        stdout = {
            write: sinon.spy()
        };
    });

    describe('with missing index.jade file', function() {
        it('throws exception if no index.jade found.', function() {
            expect(function() {
                rend = renderer.create({
                    directory: TEST + 'fixtures/presentations/noindex/',
                    stdout: stdout
                });
            }).to.Throw('No index.jade file found.');
        });
    });

    describe('with missing layout.jade file', function() {
        it('throws exception if no layout.jade found.', function() {
            expect(function() {
                rend = renderer.create({
                    directory: TEST + 'fixtures/presentations/nolayout/',
                    stdout: stdout
                });
            }).to.Throw('No layout.jade file found.');
        });
    });

    describe('with both present', function() {
        beforeEach(function() {
            rend = renderer.create({
                directory: TEST + 'fixtures/presentations/valid/',
                stdout: stdout
            });
        });

        it('says that things are ok', function() {
            expect(stdout.write.callCount).to.equal(3);
            expect(stdout.write.getCall(0).args[0]).to.equal('- Found /Users/jamiemill/Work/presenteur/src/test/fixtures/presentations/valid/index.jade.\n');
            expect(stdout.write.getCall(1).args[0]).to.equal('- Found /Users/jamiemill/Work/presenteur/src/test/fixtures/presentations/valid/layout.jade.\n');
            expect(stdout.write.getCall(2).args[0]).to.equal('- Serving extra assets from public/.\n');
        });

        it('can return the index html', function(done) {
            rend.getIndexPage()
                .then(function(html) {
                    expect(html).to.contain('<div class="slide"><h1>Slide 1</h1></div>');
                    expect(html).to.contain('<div class="slide"><h2>Slide 2</h2></div>');
                    done();
                }, done)
            .end();
        });

    });


});
