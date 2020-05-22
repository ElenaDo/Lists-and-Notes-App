<template>
  <v-container>
    <v-card
      class="mx-auto pl-3 pb-3"
      max-width="500"
      color="amber lighten-4"
      >
      <div class="mt-2" id="card-wrapper">
        <v-btn 
          @click="deleteList" 
          class="mt-7 hiddenn" 
          title="remove list"
          id="delete-list" 
          :class="{hiddenn: editingTitle}" 
          icon absolute top right fab x-small>
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-row>
          <v-col class="pt-0" cols="12" sm="8">
            <v-text-field 
              single-line 
              autofocus
              color="orange orange-darken-4" 
              class="ml-3"
              v-if="editingTitle" 
              v-model="title" 
              v-on:keyup.enter="endEditTitle(title)" 
              @blur="endEditTitle(title)">
            </v-text-field>
          </v-col>
        </v-row>
        <v-card-title
          @click="editTitle(title)" 
          :class="{hidden: editingTitle}">
          {{title || "Note name"}}
        </v-card-title>
        <p class="date pl-4 body-2 ml-auto" v-if="date.modified">Updated: {{date.modified}}</p>
        <v-textarea
          autofocus
          class="mx-5 pb-3 pt-0"
          background-color="amber lighten-4"
          color="orange orange-darken-4"
          rows="1"
          v-model="note"
          v-if="editingNote"
          auto-grow
          @blur="endEditNote"
        ></v-textarea>
        
        <div class="mx-5 mb-5 notebox" 
        >
        <p @click="editNote(note)" :class="{hidden: editingNote}">{{note || "Take a note..."}}</p>
        </div> 
         <v-btn v-if="editingNote&&note.length"
            class="white--text"
            outlined color='warning'
            absolute
            right
            bottom
            @click="endEditNote()">
          close</v-btn>
      </div>
      <p class="text-right date pr-4 body-2 ml-auto mb-0" :class="{hidden: editingNote}">Created: {{date.created}}</p>
    </v-card>
  </v-container>
</template>

<script>
import mixin from './mixin.js';

  export default {
    name: 'Notes',
    mixins: [mixin],
    data: () => ({
    date: {created: '', modified: ''},
    title: '', 
    editingTitle: false,
    note: '', 
    editingNote: false,
  }),
  props: {stateData: {
    type: Object, required: true
  }},
  created(){
    this.title = this.stateData.title;
    this.note = this.stateData.note;
    this.date = this.stateData.date;
  },
  methods: {
    modifiedDate(){
      this.date.modified = this.currentDate();
      const localState = {
        title: this.title,
        date: this.date,
        note: this.note,
        type: 'Notes'
      }
      this.$emit('update', localState);
    },
    editTitle(){
      this.editingTitle = true;
    },
    endEditTitle(){
      this.editingTitle = false;
        if(!this.createDate&&this.title.length){
          this.modifiedDate();
        }
    },
    editNote(){
      this.editingNote = true;
    },
    endEditNote(){
      this.editingNote = false;
        if(!this.createDate&&this.note.length){
          this.modifiedDate();
        }
    },
    deleteList(){
      this.$emit('delete-list')
    }, 
  }
};
</script>
<style>

.hidden{
  display: none;
}
.notebox{
  overflow: hidden;
  position: relative;
  line-height: 1.2em;
  max-height: 5.85em; 
  text-align: justify;
  margin-right: -1em;
  padding-right: 1em;
}
.notebox:before {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;

}
.notebox:after {
  content: '';
  position: absolute;
  right: 0;
  width: 1em;
  height: 1em;
  margin-top: -1em;
  background-color: #ffecb3;
}
.date{
  color: #818181;
  font-style: italic;
  margin-bottom: 1rem;
  margin-left: 1rem; 
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