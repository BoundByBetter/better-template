import { Post, PostStatus } from '@boundbybetter/shared';
import { comparePosts } from './comparePosts';

describe('comparePosts', () => {
  it('should return true when comparing two identical posts', () => {
    const postA: Post = getDefaultPost();

    const postB: Post = getDefaultPost();

    const result = comparePosts(postA, postB);

    expect(result).toBe(true);
  });

  it('should return false when comparing two different posts', () => {
    const postA: Post = getDefaultPost();

    const postB: Post = getDefaultPost();

    postB.title = 'Post 2';

    const result = comparePosts(postA, postB);

    expect(result).toBe(false);
  });

  it('should return false when comparing a post with undefined', () => {
    const postA: Post = getDefaultPost();

    const postB = undefined;

    const result = comparePosts(postA, postB);

    expect(result).toBe(false);
  });

  it('should return false when each property is different', () => {
    // Run a test where each property is different between the two posts
    const postA: Post = getDefaultPost();
    let postB: Post = getDefaultPost();

    postB.id = '2';
    let result = comparePosts(postA, postB);
    expect(result).toBe(false);

    postB = getDefaultPost();
    postB.author = 'Jane Doe';
    result = comparePosts(postA, postB);
    expect(result).toBe(false);

    postB = getDefaultPost();
    postB.content = 'Changed';
    result = comparePosts(postA, postB);
    expect(result).toBe(false);

    postB = getDefaultPost();
    postB.createdAt = 'Changed';
    result = comparePosts(postA, postB);
    expect(result).toBe(false);

    postB = getDefaultPost();
    postB.rating = 99;
    result = comparePosts(postA, postB);
    expect(result).toBe(false);

    postB = getDefaultPost();
    postB.status = PostStatus.INACTIVE;
    result = comparePosts(postA, postB);
    expect(result).toBe(false);

    postB = getDefaultPost();
    postB.title = 'Changed';
    result = comparePosts(postA, postB);
    expect(result).toBe(false);

    postB = getDefaultPost();
    postB.updatedAt = 'Changed';
    result = comparePosts(postA, postB);
    expect(result).toBe(false);
  });

  // Add more test cases as needed
});

function getDefaultPost(): Post {
  return {
    id: '1',
    status: PostStatus.ACTIVE,
    title: 'Post 1',
    rating: 4.5,
    content: 'Lorem ipsum dolor sit amet',
    author: 'John Doe',
    createdAt: '2022-01-01',
    updatedAt: '2022-01-02',
  };
}
