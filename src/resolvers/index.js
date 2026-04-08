const Todo = require('../models/Todo');

const resolvers = {
  Query: {
    todos: async () => {
      try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        return todos;
      } catch (error) {
        throw new Error('Error fetching todos');
      }
    },
    todo: async (_, { id }) => {
      try {
        const todo = await Todo.findById(id);
        if (!todo) {
          throw new Error('Todo not found');
        }
        return todo;
      } catch (error) {
        throw new Error('Error fetching todo');
      }
    }
  },

  Mutation: {
    createTodo: async (_, { input }) => {
      try {
        const todo = new Todo(input);
        const result = await todo.save();
        return result;
      } catch (error) {
        throw new Error('Error creating todo');
      }
    },

    updateTodo: async (_, { id, input }) => {
      try {
        const todo = await Todo.findByIdAndUpdate(
          id,
          { ...input, updatedAt: new Date() },
          { new: true, runValidators: true }
        );
        if (!todo) {
          throw new Error('Todo not found');
        }
        return todo;
      } catch (error) {
        throw new Error('Error updating todo');
      }
    },

    deleteTodo: async (_, { id }) => {
      try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
          throw new Error('Todo not found');
        }
        return true;
      } catch (error) {
        throw new Error('Error deleting todo');
      }
    },

    toggleTodo: async (_, { id }) => {
      try {
        const todo = await Todo.findById(id);
        if (!todo) {
          throw new Error('Todo not found');
        }
        todo.completed = !todo.completed;
        todo.updatedAt = new Date();
        await todo.save();
        return todo;
      } catch (error) {
        throw new Error('Error toggling todo');
      }
    }
  }
};

module.exports = resolvers;
