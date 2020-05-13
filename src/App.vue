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
             @click="addItem('ListDone')"
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
        <v-col class="mt-10" cols="12" sm="6" v-for="(item, index) in arrOfLists" :key="item.key">
          <component  @delete-list="deleteList(index)" :is="item.type"></component>
        </v-col>
      </v-row>
     </v-card>
    </v-content>
  </v-app>
</template>

<script>

import ListDone from './components/done-list';
import Notes from './components/notes';

export default {
  name: 'App',

  components: {
    ListDone,
    Notes
  },

  data: () => ({
    arrOfLists: [{key: 0, type: 'ListDone'}],
    key: 1
  }),
  methods: {
    addItem(type){
      this.arrOfLists.unshift({type, key: this.key++});
    },
    deleteList(index){
      let quest = confirm('Delete this list?')
        if (quest){
          this.arrOfLists.splice(index, 1);
        }
    },
  }
};
</script>
<style>

</style>