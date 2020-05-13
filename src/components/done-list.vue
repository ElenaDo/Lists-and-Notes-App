<template>
  <v-container>
    <v-card
          class="mx-auto pl-3 pb-3"
          max-width="500"
        >
       <div class="mt-2" id="card-wrapper">
        <v-btn 
          @click="deleteList" 
          class="mt-7 hiddenn" 
          title="remove list"
          id="delete-list" 
          :class="{hidden: title.editingTitle}" 
          icon absolute top right fab x-small>
            <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-row>
          <v-col class="pt-0" cols="12" sm="8">
            <v-text-field 
              single-line 
              autofocus 
              class="ml-3"
              v-if="title.editingTitle" 
              v-model="title.name" 
              v-on:keyup.enter="endEditList" 
              @blur="endEditList">
            </v-text-field>
          </v-col>
        </v-row>

        <v-card-title 
          v-model="title.name" 
          @click="editList" 
          :class="{hiddenn: title.editingTitle, titlehid: title.editingTitle}">
          {{title.name || 'List name'}}
        </v-card-title>

        <p class="date pl-4 body-2 ml-auto">{{date}}</p>

        <div class="d-flex align-center">
          <v-text-field 
            single-line
            class="ml-3 mr-3" 
            v-model='text' 
            v-on:keyup.enter="add" 
            placeholder="enter your text here">
          </v-text-field>

          <v-btn 
            class="mr-3 
            white--text" 
            id="add-button" 
            color="indigo" 
            @click="add" 
            :disabled="!text.length">
          Add</v-btn>
        </div> 

          <v-list shaped class="ml-3">
            <li 
              v-for="item in sorted" 
              class="d-flex align-center" 
              :key="item.id" 
              :class="{strike:item.done}">
              
              <v-checkbox 
                color="indigo" 
                v-model="item.done" 
                class="mr-2"
                @change="CreateDate"
                ></v-checkbox>
              
              <v-text-field 
                single-line 
                color="indigo" 
                v-if="item.editingText" 
                autofocus v-on:keyup.enter="endEdit(item)" 
                @blur="endEdit(item)" 
                type="text" 
                v-model="item.text" 
                ref="editInput"></v-text-field>
              
              <label 
                v-else 
                @click="status(item)" 
                for="checkbox"> {{item.text}} </label> 
              
              <v-btn 
                @click="editTask(item)" 
                icon 
                class="hiddenn ml-auto" 
                :class="{invisible: item.editingText}">
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
              
              <v-btn 
                @click="removeTask(item)" 
                icon 
                class="hiddenn ml-1" 
                :class="{invisible: item.editingText}">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </li>
          </v-list>  
       </div>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'ListDone',
    data: () => ({
    title: {name: '', editingTitle: false},
    text: '',
    date: null,
    items: [{text: 'to eat', done: true, id: 0, editingText: false},{text: 'to sleep', done: false, id: 1, editingText: false}],
    id: 3
  }),
  computed: {
    sorted(){
      let newArr = [...this.items];
      return newArr.sort((a,b) =>{
        return (a.done === b.done)? 0 : a.done? 1 : -1;
      })
    }
  },
  methods: {
    editList(){
      this.title.editingTitle = true;
    },
    endEditList(){
      this.title.editingTitle = false;
      if (!this.date&&this.title.name.length){
      this.CreateDate();
      }
    },
    CreateDate(){
      var today = new Date();
      var date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
      this.date = 'Created: ' + date;
    },
    add(){
      if (this.text.length){
      this.items.push({id: this.id, text: this.text, done: false, editingText: false});
      this.id++;
      this.text = '';
      this.CreateDate();
      }
    },
  status(item){
    item.done = !item.done;
    this.CreateDate();
  },
  editTask(item){
    item.editingText = true;
    item.prevText = item.text;
    this.$nextTick( function(){this.$refs.editInput[0].focus()} );
  },
  endEdit(item){
    item.editingText = false;
    if (!this.date && item.text !== item.prevText){
    this.CreateDate();
    }
  },
  removeTask(item){
    let index = this.items.indexOf(item);
    this.items.splice(index,1);
    this.deleted.push(item);
  },
  deleteList(){
    this.$emit('delete-list');
  },
  }
};
</script>
<style>
.strike label{
  text-decoration: line-through;
  color: indigo;
}
li{
  list-style-type: none;
}
.hidden{
  display: none;
}
.hiddenn{
  visibility: hidden;
}
.titlehid{
  margin-top: -70px !important;
}
#card-wrapper:hover #delete-list{
  visibility: visible;
}


li:hover > button{
  visibility: visible;
}

li button.invisible{
  visibility: hidden;
}
div>button.v-btn--disabled:disabled#add-button{
  background-color: #9aa6e6 !important;
  color: white !important;

}

</style>