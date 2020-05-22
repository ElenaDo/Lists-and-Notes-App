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
          :class="{hidden: editingTitle}" 
          icon absolute top right fab x-small>
            <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-row>
          <v-col class="pt-0" cols="12" sm="8">
            <v-text-field 
              single-line 
              autofocus 
              class="ml-3"
              v-if="editingTitle" 
              v-model="title" 
              v-on:keyup.enter="endEditList" 
              @blur="endEditList">
            </v-text-field>
          </v-col>
        </v-row>

        <v-card-title 
          v-model="title" 
          @click="editList" 
          :class="{hiddenn: editingTitle, titlehid: editingTitle}">
          {{title || 'List name'}}
        </v-card-title>
        <p class="date pl-4 body-2 ml-auto" v-if="date.modified">Updated: {{date.modified}}</p>

        <div class="d-flex align-center">
          <v-text-field 
            single-line
            class="ml-3 mr-3" 
            v-model='newItemText' 
            v-on:keyup.enter="add" 
            placeholder="enter your text here">
          </v-text-field>

          <v-btn 
            class="mr-3 
            white--text" 
            id="add-button" 
            color="indigo" 
            @click="add" 
            :disabled="!newItemText.length">
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
                @change="modifyDate"
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
          <p class="text-right date pr-4 body-2 ml-auto mb-0">Created: {{date.created}}</p>    
       </div>
    </v-card>
  </v-container>
</template>

<script>
  import mixin from './mixin.js';

  export default {
    name: 'DoneList',
    mixins: [mixin],
    data: () => ({
    title: '',
    editingTitle: false,
    newItemText: '',
    date: {created: '', modified: ''},
    items: [],
  }),
  props: {stateData: {
    type: Object, required: true
  }},
  created(){
    this.title = this.stateData.title
    this.items = JSON.parse(JSON.stringify(this.stateData.items))
    this.date = this.stateData.date;
  },
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
      this.editingTitle = true;
    },
    endEditList(){
      this.editingTitle = false;
      this.modifyDate();
    },
    modifyDate(){
      this.date.modified = this.currentDate();
      const localState = {
        title: this.title,
        date: this.date,
        items: this.items,
        type: 'DoneList'
      }
      this.$emit('update', localState);
      
    },
    add(){
      if (this.newItemText.length){
        const id = this.getNextId(this.items)
        this.items.push({id, text: this.newItemText, done: false, editingText: false});
        this.newItemText = '';
        this.modifyDate();
      }
    },
  status(item){
    item.done = !item.done;
    this.modifyDate();
  },
  editTask(item){
    item.editingText = true;
    item.prevText = item.text;
    this.$nextTick( function(){this.$refs.editInput[0].focus()} );
  },
  endEdit(item){
    item.editingText = false;
    if (this.newItemText !== item.prevText){
    this.modifyDate();
    }
  },
  removeTask(item){
    let index = this.items.indexOf(item);
    this.items.splice(index,1);
    this.modifyDate();
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