<template>
    <div class="user-item" v-show="this.$props.userData.data.name !== null || this.$props.userData.data.surname !== null || this.$props.userData.data.patronymic !== null">
        <span class="user-item__name">{{this.$props.userData.data.name}} {{this.$props.userData.data.surname}} {{this.$props.userData.data.patronymic}}</span>

        <button
            v-if="this.$props.type === 'addList'"
            type="button" 
            style="background-color: #40B159;"
            @click="onClickHandler()" 
        >
            Добавить
        </button>
    </div>
</template>

<script>
    export default {
        name: 'UserItem',

        props: {
            userData: { type: Object },
            type: {type: String}
        },

        methods: {
            onClickHandler() {
                this.$props.type === 'addList' ? 
                this.$emit('onClickAddUser', this.$props.userData) : null
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user-item {
        display: flex;
        align-items: center;
        border: 1px solid #C4C4C4;
        padding: 15px;
        
        &__name {
            margin-right: auto;
        }
        
        button {
            border: 0;
            padding: 15px;
            cursor: pointer;
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
    }
</style>