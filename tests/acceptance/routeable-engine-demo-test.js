import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | routeable engine demo');

test('can invoke components', function(assert) {
  visit('/routeable-engine-demo/blog/new');

  andThen(() => {
    assert.equal(currentURL(), '/routeable-engine-demo/blog/new');

    assert.equal(this.application.$('.routeable-hello-world').text().trim(), 'Hello, world!');
  });
});

test('can render a link', function(assert) {
  assert.expect(2);

  visit('/routeable-engine-demo/blog/post/1');

  andThen(() => {
    assert.equal(currentURL(), '/routeable-engine-demo/blog/post/1');

    assert.equal(this.application.$('a.routeable-post-comments-link').attr('href'), '/routeable-engine-demo/blog/post/1/comments');
  });
});

test('internal links can be clicked', function(assert) {
  assert.expect(1);

  visit('/routeable-engine-demo/blog/post/1');
  click('.routeable-post-comments-link');

  andThen(() => {
    assert.equal(currentURL(), '/routeable-engine-demo/blog/post/1/comments');
  });
});

test('a route can use transitionTo to transition to internal route', function(assert) {
  assert.expect(1);

  visit('/routeable-engine-demo/blog/new');
  click('.trigger-transition-to');

  andThen(() => {
    assert.equal(currentURL(), '/routeable-engine-demo/blog/post/1');
  });
});

test('internal links can be clicked', function(assert) {
  assert.expect(1);

  visit('/routeable-engine-demo/special-admin-blog-here/post/1');
  click('.routeable-post-comments-link');

  andThen(() => {
    assert.equal(currentURL(), '/routeable-engine-demo/special-admin-blog-here/post/1/comments');
  });
});

test('transitionTo works properly within parent application', function(assert) {
  assert.expect(1);

  visit('/routeable-engine-demo/normal-route');

  andThen(() => {
    assert.equal(currentURL(), '/routeless-engine-demo');
  });
});