<template>
    <div class="avatars" :style="cssVars">
        <div v-if="showRemainingAvatars" class="avatars__item">
            <div class="avatars__image">
                +{{ remain }}
            </div>
        </div>
        <div v-for="item in items" class="avatars__item">
            <div class="avatars__image">
                <img v-if="item" :src="item" alt="avatar" onerror="this.style.display='none'" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { colors } from 'quasar';
import { computed } from 'vue';

const { getPaletteColor } = colors
const props = defineProps({
    items: Object,
    max: {
        type: Number,
        required: false
    },
    total: {
        type: Number,
        required: false
    },
    height: {
        type: [String, Number],
        default: '40px',
        required: false
    },
    width: {
        type: [String, Number],
        default: '40px',
        required: false
    },
})
const showRemainingAvatars = computed(() => {
    return props.max < props.items.length || props.total < props.items.length
})
const remain = computed(() => {
    const x = props.total || props.items.length
    return x - props.max || 1
})
const items = computed(() => {
    if (!props.max) return props.items

    return props.items.slice(0, props.max)
})
const cssVars = computed(() => {
    const { height, width } = props
    return {
        '--height': typeof height === 'number' ? height + 'px' : height,
        '--width': typeof width === 'number' ? width + 'px' : width,
        '--default-avatar-color': getPaletteColor('grey-4'),
    }
})
</script>

<style  scoped>
.avatars {
    display: flex;
    flex-direction: row-reverse;
}

.avatars__item {
    margin-left: -4px;
}

.avatars__image {
    box-shadow: 0 0 0 4px #fff;
    color: white;
    /* background-color: rgb(187, 187, 187); */
    background-color: var(--default-avatar-color);
    height: var(--height);
    width: var(--width);
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 9999px;
}

img {
    border-radius: inherit;
    height: inherit;
    width: inherit;
}
</style>