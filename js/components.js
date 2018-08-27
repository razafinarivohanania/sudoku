Vue.component('component-cell', {
    props: ['id'],
    data: function () {
        return {
            tdClass: {
                'border-left': false,
                'border-right': false,
                'border-top': false,
                'border-bottom': false
            },
            inputValue: ''
        }
    },
    mounted: function () {
        this.updateTdClass();
    },
    methods: {
        updateTdClass: function () {
            var coordinate = this.idToCoordinate();
            var border = Sudoku.Border.getBorder(coordinate.x, coordinate.y);

            this.tdClass['border-left'] = border.left;
            this.tdClass['border-right'] = border.right;
            this.tdClass['border-top'] = border.top;
            this.tdClass['border-bottom'] = border.bottom;
        },
        listenKey: function (event) {
            var key = event.key;
            this.forceInputValueToDigit(key);
            this.moveInputFocus(key);
        },
        forceInputValueToDigit: function (key) {
            if (key.indexOf('Arrow') >= 0 && /^\d$/.test(this.inputValue))
                return;
        
            this.inputValue = /^\d$/.test(key) && key != 0 ?
                key :
                '';
        },
        moveInputFocus: function (key) {
            var position = null;
            switch (key) {
                case 'ArrowLeft':
                    position = Sudoku.Position.LEFT;
                    break;
                case 'ArrowRight':
                    position = Sudoku.Position.RIGHT;
                    break
                case 'ArrowUp':
                    position = Sudoku.Position.UP;
                    break;
                case 'ArrowDown':
                    position = Sudoku.Position.DOWN;
            }

            if (position == null)
            return;

            var coordinate = this.idToCoordinate();
            var idNeighBour = this.coordinateToId(Sudoku.getNeighbour(coordinate.x, coordinate.y, position));
            var neighBourInput = document.querySelector('[id="' + idNeighBour + '"]>input');
            neighBourInput.focus();
        },
        idToCoordinate: function () {
            return {
                x: this.id.charAt(0),
                y: this.id.charAt(1)
            }
        },
        coordinateToId: function (coordinate) {
            return '' + coordinate.x + coordinate.y;
        }
    },
    template: `<td v-bind:class='tdClass' v-bind:id='id'>
        <input type='text' maxlength='1' v-on:keyup='listenKey' v-model='inputValue' v-bind:ref='id'/>
    </td>`
});

Vue.component('component-row', {
    props: ['id'],
    methods: {
        buildId: function (id, index) {
            id--;
            index--;
            return '' + id + index;
        }
    },
    template: `<tr>
        <component-cell v-bind:key="buildId(id, index)" v-bind:id="buildId(id, index)" v-for='index in 9'></component-cell>
    </tr>`
})

Vue.component('component-block', {
    template: `<table>
        <component-row v-bind:key='index' v-bind:id='index' v-for='index in 9'></component-row>
    </table>`
})

new Vue({
    el: '#sudoku'
});;