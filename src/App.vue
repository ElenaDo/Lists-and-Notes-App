<template>
  <v-app>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-icon large class="mr-3">mdi-bookmark-check-outline</v-icon>  To Do List App
    </v-app-bar>
  
    <v-content class="py-15">
      
      <v-speed-dial
          color="pink"
          fab
          dark
          absolute
          top
          right
          direction="left"
          open-on-hover

          >

            <v-btn
             slot="activator"
             color="pink"
             dark
             fab
           >
            <v-icon>mdi-plus</v-icon>
           </v-btn>
           <v-btn
             fab
             dark
             small
             color="indigo"
             title="Add new list"
             @click="addItem('DoneList')"
           >
             <v-icon>mdi-format-list-checks</v-icon>
           </v-btn>
           <v-btn
             fab
             dark
             small
             color="amber"
             title="Add new note"
             @click="addItem('Notes')"
           >
             <v-icon>mdi-note-outline</v-icon>
           </v-btn>
          </v-speed-dial>
      
      <v-card>
      <v-row>
        <v-col class="mt-10" cols="12" sm="6" v-for="(item, index) in arrOfLists" :key="item.id">
          <component
            @delete-list="deleteList(index)"
            :is="item.type" 
            :state-data="item.data"
            @update = "update($event, index)"
          >
          </component>
        </v-col>
      </v-row>
     </v-card>
    </v-content>
  </v-app>
</template>

<script>
import mixin from './components/mixin.js';
import DoneList from './components/done-list';
import Notes from './components/notes';

console.log(mixin);

export default {
  name: 'App',
  mixins: [mixin],
  components: {
    DoneList,
    Notes
  },

  data: () => ({
    arrOfLists: [{
      id: 0,
      type: 'DoneList',
      data: {
        items: [{text: 'to eat', done: true, id: 0, editingText: false},{text: 'to sleep', done: false, id: 1, editingText: false}],
        title: ''
      }
    }],
    emptyData: {
      DoneList: {
        items: []
      },
        Notes: {
          note: ''
        }
    },
  }),
  created(){
    if(localStorage.keeper){
      this.arrOfLists = JSON.parse(localStorage.keeper)
    }
  },
  methods: {
    addItem(type){
      const id = this.getNextId(this.arrOfLists, true);
      this.arrOfLists.unshift({type, id, data: this.emptyData[type]});
      this.save();
    },
    deleteList(index){
      let quest = confirm('Delete this list?')
        if (quest){
          this.arrOfLists.splice(index, 1);
          this.save();
        }
    },
    update(val, index){
      console.log(val);
      this.arrOfLists[index].data = val;
      this.save();
    },
    save(){
      localStorage.keeper = JSON.stringify(this.arrOfLists);
    }
  }
};
</script>
<style>

</style>