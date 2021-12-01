<template>
  <div class="search">
    <div class="search__header">
      <input type="text" placeholder="Введите имя" v-model="searchField" @input="onChangeHandler()">
      <div class="loader">
        <Loader :loadingState="this.loadingState"/>
      </div>
    </div>

    <div class="search__body">
      <ul class="users-list">
        <li v-for="(user, i) of this.searchResults" :key="'user_' + i">
          <UserItem 
            :userData="user"
            :type="'addList'"
            @onClickAddUser="addUserHandler"
          />
        </li>
      </ul>
    </div>

    <div class="search__footer">
      <button type="button" @click="isAutoSearchEnabled = !isAutoSearchEnabled">
        <span>
          {{this.isAutoSearchEnabled ? 'Остановить автопоиск' : 'Включить автопоиск'}}
        </span>
      </button>
    </div>

    <div class="users " v-if="this.userList.length">
      <div class="users__header">
        <span>Список добавленных элементов:</span>
      </div>
      <ul class="users-list">
        <li v-for="(user, i) of this.userList" :key="'user_' + i">
          <UserItem  
            :userData="user"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import UserItem from './UserItem'
  import Loader from './Loader'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'SearchComponent',

    components: {
      UserItem,
      Loader
    },

    data() {
      return {
        searchField: '',
        isAutoSearchEnabled: true,

        userList: []
      }
    },

    methods: {
      ...mapActions('search', ['SEARCH_USER']),

      addUserHandler(user) {
        this.userList.push(user)
      },

      onChangeHandler() {
        if( this.searchField.length > 2 && this.isAutoSearchEnabled ) {
          this.SEARCH_USER(this.searchField)
        }
      }
    },

    computed: {
      ...mapGetters('search', ['searchResults', 'loadingState'])
    }
  }
</script>

<style lang="scss">
  .search {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    height: 100%;
    max-width: 500px;
    border: 1px solid #C4C4C4;

    &__header {
      position: relative;
      min-height: 40px;

      & .loader {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
      }

      input {
        display: block;
        width: 100%;
        height: 100%;
        padding: 20px;
        padding-right: 70px;
        border: 0;
        border-bottom: 1px solid #C4C4C4;
      }
    }

    &__body {
      max-height: 400px;
      overflow: hidden auto;
    }

    &__footer {
      margin-top: auto;
      width: 100%;
      min-height: 40px;

      button {
        border: 0;
        background-color: #7382CD;
        width: 100%;
        min-height: 60px;
        font-size: 12px;
        line-height: 14px;
        cursor: pointer;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        span {
          display: flex;
          margin: 0 auto;
          max-width: 100px;
        }
      }
    }
  }

  .users{
    padding-top: 20px;
    &__header {
      padding: 10px;
      background-color: #C4C4C4;
    }   
  }

  .users-list {
    margin: 0;
    padding: 0;
    list-style: none;
    height: 300px;
    overflow: hidden auto;

    &::-webkit-scrollbar{
      width: 6px;
      height: 6px;
      background-color: #f2f2f2;
      border-radius: 0;
    }
    
    
    &::-webkit-scrollbar-thumb {
      background: #c4c4c4;
      border-radius: 0;
    }
  }
</style>
