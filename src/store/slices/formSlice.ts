import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Person {
  id: number;
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenID: string;
  gender: string;
  mobilePhone: string;
  passportNo: string;
  expectedSalary: string;
  countryCode: string;
}

interface FormState {
  people: Person[];
  editingPerson: Person | null;
}

const initialState: FormState = {
  people: [],
  editingPerson: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.people.push(action.payload);
    },
    deletePerson: (state, action: PayloadAction<number>) => {
      state.people = state.people.filter((person) => person.id !== action.payload);
    },
    setEditingPerson: (state, action: PayloadAction<Person | null>) => {
      state.editingPerson = action.payload;
    },
    updatePerson: (state, action: PayloadAction<Person>) => {
      state.people = state.people.map((person) =>
        person.id === action.payload.id ? action.payload : person
      );
      state.editingPerson = null;
    },
  },
});

export const { addPerson, deletePerson, setEditingPerson, updatePerson } = formSlice.actions;
export default formSlice.reducer;