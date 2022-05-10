import { Book, BookStore } from "../../models/book";

const storee = new BookStore();

describe('Book Model', () => {
    
    it('should have an index method', () => {
        expect(storee.index).toBeDefined();
    })
    it('should have a create method', () => {
        expect(storee.create).toBeDefined();
    })
    it('should be able to connect to database', async () => {
        const result = await storee.index()
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
        await storee.create(book);
        const books = await storee.index();
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
        await storee.update(book);
        const books = await storee.index();
        expect(books).toEqual([book]);
    })
    it('should delete the book', async () => {
        const id = 1;
        await storee.delete(id);
        const books = await storee.index();
        expect(books).toEqual([]);
    })
})