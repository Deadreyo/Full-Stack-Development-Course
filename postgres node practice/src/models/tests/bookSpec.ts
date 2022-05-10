import { Book, BookStore } from "../book";

const store = new BookStore();

describe('Book Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    })
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    })
    it('should be able to connect to database', async () => {
        const result = await store.index()
        expect(result).toEqual([]);
    })
    it('create method should add a book', async () => {
        const book: Book = {
            id: 1,
            title: "Test Book",
            author: "Test Author",
            total_pages: 100,
            type: "Test Type",
            summary: "Test Summary"
        }
        await store.create(book);
        const books = await store.index();
        expect(books).toEqual([book]);
    })
    it('update method should update the book', async () => {
        const book: Book = {
            id: 1,
            title: "New title",
            author: "New Author",
            total_pages: 100,
            type: "Test Type",
            summary: "Test Summary"
        }
        await store.update(book);
        const books = await store.index();
        expect(books).toEqual([book]);
    })
    it('should delete the book', async () => {
        const id = 1;
        await store.delete(id);
        const books = await store.index();
        expect(books).toEqual([]);
    })
})