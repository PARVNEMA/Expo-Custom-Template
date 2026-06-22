import { View, Text, FlatList, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';

interface TodoInterface {
  id: string;
  name: string;
}

const HomeScreen = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [todoname, setTodoName] = useState('');
  const [editTodo, setEditTodo] = useState('');

  const handleSaveTodo = () => {
    const newTodo = { id: Math.random().toString(), name: todoname };

    setTodos([...todos, newTodo]);
    setTodoName('');
  };

  const DelteTodo=(id:string)=>{
    const newTodos=todos.filter((todo)=>todo.id!==id);
    setTodos(newTodos);
  }
  const saveEditTodo=(id:string)=>{
    const newTodo=todos.filter((prev)=>prev.id !==id)

    const edittedTodo={id:id,name:editTodo}


  }
  return (
    <View className='flex-1'>
      <Text>Todo App</Text>
      <View>
        <TextInput
          value={todoname}
          onChangeText={setTodoName}
          className="p-4 border-2 border-gray-300 rounded-lg mb-4"
        />
        <Pressable onPress={handleSaveTodo} className="p-4">
          <Text>Save Todo</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TextInput
             value={item.name}
             editable={item.id ===editTodo}

             />
            <Text>{item.name}</Text>
            <Pressable onPress={()=>DelteTodo(item.id)}>
              <Text>Delete</Text>
            </Pressable>
            <Pressable onPress={()=>setEditTodo(item.id)}> <Text>Edit</Text></Pressable>

            {item.id === editTodo && (
              <Pressable onPress={()=>saveEditTodo(item.id)}>
                <Text>Save</Text>
              </Pressable>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
