export const ACTIONS = {
  ADD: "added",
  DELETE: "deleted",
  CHECK: "checked",
};

export default function todoReducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

      return [
        ...todos,
        {
          id: newId,
          name: action.name,
          isChecked: false,
        },
      ];
    }

    case ACTIONS.DELETE: {
      return todos.filter((todo) => todo.id !== action.id);
    }

    case ACTIONS.CHECK: {
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, isChecked: !todo.isChecked } : todo
      );
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
