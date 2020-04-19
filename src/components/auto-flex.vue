<template>
    <div class="flex-wrapper">
        <div class="flex-left" >
            <slot name="left"></slot>
        </div>
        <div class="flex-right">
            <slot name="right" ></slot>
        </div>
    </div>
</template>

<style lang="scss" >
    .flex-wrapper {
        display: flex;
        .flex-right {
            width: 100%;
        }
    }
</style>