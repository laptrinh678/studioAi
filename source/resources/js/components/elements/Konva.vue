<template>
<portlet :show-head="false">
<div>
    <p class="white--text">position: {{ posX }} - {{ posY }} </p>
    <!-- <p class="white--text">shapeNameChoosen: {{ shapeNameChoosen }}</p>
    <p class="white--text">isHoldingSpace: {{ isHoldingSpace }}</p> -->
    <!-- <p class="white--text">isHoldingShift: {{ isHoldingShift }}</p> -->
    <!-- <p class="white--text">isHoldingCtrl: {{ isHoldingCtrl }}</p> -->
    <!-- <p class="white--text">isDrawing: {{ isDrawing }} </p>
    <p class="white--text">isPolygonCreated: {{ isPolygonCreated }} </p> -->
    <!-- <p class="white--text">isAddItemJsonResult: {{ isAddItemJsonResult }} </p> -->
    <!-- <p class="white--text">jsonResult: {{ jsonResult }} </p> -->
    <!-- <p class="white--text" v-for="(item, index) in rectangles" :key="index">Rectangles:
        <p>x,y: {{ item.x }} - {{ item.y }}</p>
        <p>x2, y2: {{ item.x2 }} - {{ item.y2 }}</p>
        <p>x2_0, y2_0: {{ item.x2_0 }} - {{ item.y2_0 }}</p>
        <p>width: {{ item.width }} </p>
    </p> -->
    <el-row>
        <el-col :md="6">
            <span class="white--text pr-4">Label</span>
                <select
                    v-model="labelChoosen"
                    class="my-4"
                    @change="onChangeSelectLabel"
                    filterable
                    size="large"
                >
                    <option
                        v-for="(item, index) in labels"
                        :key="`label-${index}`"
                        :value="item.value"
                    >
                        {{ item.value }}
                    </option>
                </select>
        </el-col>

        <el-col :md="6" class="d-flex align-items-center">
                <el-radio-group v-model="typeOfShapeChoosen" size="small" class="radio-group-custom">
                    <el-radio-button
                        v-for="(item, index) in typeOfShapes"
                        :key="`label-${index}`"
                        :label="item"
                    />
                </el-radio-group>

                <!-- <select
                    v-model="typeOfShapeChoosen"
                    class="my-4"
                    @change="onChangeSelectLabel"
                >
                    <option
                        v-for="(item, index) in typeOfShapes"
                        :key="`label-${index}`"
                        :value="item"
                    >
                        {{ item }}
                    </option>
                </select> -->
        </el-col>

        <el-col :md="6" class="text-right">
            <el-button
                type="danger"
                round
             >
                Lưu
            </el-button>
        </el-col>
    </el-row>

    <div class="div-stage" ref="konva">
        <v-stage
            ref="stage"
            :config="configKonva"
            @mousedown="handleStageMouseDown"
            @mousemove="handleStageMouseMove"
            @mouseup="handleStageMouseUp"
            @touchstart="handleStageMouseDown"
        >
            <v-layer ref="layer">
                <!-- <v-circle
                    :config="configCircle"
                    v-for="(circle, index) in circles"
                    :key="`circle-${index}`"
                /> -->

                <v-rect
                    v-for="(item, index) in rectangles"
                    :key="`item-${item.name}`"
                    :config="item"
                    @transformend="handleTransformEnd"
                    @dragend="handleDragEnd"
                />
                <v-line
                    v-for="(item, index) in polygons"
                    :key="`item-${item.name}`"
                    :config="item"
                    @dragend="handleDragEnd"
                />

                <v-line
                    v-for="(item, index) in lines"
                    :key="`item-${item.name}`"
                    :config="item"
                    @dragend="handleDragEnd"
                />

                <v-transformer
                    ref="transformer"
                    :rotateEnabled="false"
                    :resizeEnabled="false"
                    :borderStrokeWidth="4"
                />
            </v-layer>
        </v-stage>
    </div>

    <p class="white--text" v-for="(item, index) in lines" :key="index">Line:
        <p>{{ item }}</p>
    </p>
    <p class="white--text" v-for="(item, index) in rectangles" :key="index">Rectangles:
        <p>{{ item }}</p>
    </p>
    <p class="white--text" v-for="(item, index) in polygons" :key="index">Polygon:
        <p>{{ item }}</p>
    </p>

</div>
</portlet>
</template>

<script>
import { findIndex, round, sortBy } from 'lodash'
import VueDrawingCanvas from "vue-drawing-canvas";
import labels from "~/constants/labels"

const width = window.innerWidth;
const height = window.innerHeight;

export default {
    name: "Konva",
    middleware: "auth",
    components: { VueDrawingCanvas },
    data (vm) {
        return {
            configKonva: {
                width: width,
                height: 600,
            },
            configCircle: {
                radius: 70,
                fill: "red",
                stroke: "black",
                strokeWidth: 2,
                draggable: true
            },
            lines: [],
            polygons: [],
            rectangles: [
                // {
                //     x: 20,
                //     y: 20,
                //     x2: 300,
                //     y2: 300,
                //     x2_0: 300,
                //     y2_0: 300,
                //     width_0: 280,
                //     width: 280,
                //     height: 280,
                //     draggable: true,
                //     fill: 'blue',
                //     name: 'dsadasd'
                // },
                // {
                //     x: 350,
                //     y: 200,
                //     x2: 550,
                //     y2: 200,
                //     x2_0: 550,
                //     y2_0: 200,
                //     width_0: 200,
                //     width: 200,
                //     height: 280,
                //     draggable: true,
                //     fill: 'red',
                //     name: 'cc'
                // }
            ],
            strokeWidthLine: 3,
            circles: [1, 2 ,3],
            isDrawing: false,
            opacityShape: 0.6,
            labels: labels,
            labelChoosen: labels[0].value,
            color: labels[0].color,
            typeOfShapes: ['Polygon', 'Line', 'Rectangle'],
            typeOfShapeChoosen: 'Rectangle',
            shapeNameChoosen: '',
            positionXRectStart: 0,
            positionYRectStart: 0,
            posX: 0,
            posY: 0,
            jsonResult: [],
            isAddItemJsonResult: false,
            isHoldingCtrl: false,
            isHoldingShift: false,
            isHoldingSpace: false,
            isPolygonCreated: false,
        }
    },
    mounted() {
        this.configKonva = {
            width: this.$refs.konva.clientWidth,
            height: this.$refs.konva.clientHeight
        }
    },
    created() {
        this.handleShiftKeypress()
        // this.handleSpaceKeypress()
        // this.handleUndo()
    },
    methods: {
        onChangeSelectLabel() {
            let _this = this
            let index = findIndex(this.labels, function(o) { return o.value == _this.labelChoosen; });

            if (index > -1) {
                this.color = this.labels[index].color
            }
        },
        handleStageMouseDown(e) {
            const target = e.target
            const stage = target.getStage();

            if (target == stage || this.isHoldingShift) {
                this.isDrawing = true;
                this.shapeNameChoosen = ''
                this.updateTransformer()

                const position = stage.getPointerPosition();

                let timestamp = new Date().getTime()

                // Shape mới đc sinh ra trong array tương ứng
                if (this.typeOfShapeChoosen == 'Polygon' && !this.isPolygonCreated) {
                    this.polygons = [...this.polygons, {
                        points: [position.x, position.y],
                        fill: this.color,
                        closed: true,
                        opacity: this.opacityShape,
                        draggable: false,
                        name: `shape-${timestamp}`,
                        stroke: this.color,
                        // strokeWidth: 2,
                    }];

                    this.isPolygonCreated = true
                }

                if (this.typeOfShapeChoosen == 'Line') {
                    this.lines = [...this.lines, {
                        points: [position.x, position.y],
                        points_0: [position.x, position.y],
                        stroke: this.color,
                        strokeWidth: this.strokeWidthLine,
                        opacity: this.opacityShape,
                        draggable: false,
                        name: `shape-${timestamp}`,
                    }];

                }

                if (this.typeOfShapeChoosen == 'Rectangle') {
                    this.rectangles = [...this.rectangles, {
                        x: position.x,
                        y: position.y,
                        fill: this.color,
                        opacity: this.opacityShape,
                        draggable: false,
                        name: `shape-${timestamp}`
                    }];

                }

                // state để xử lý case click chuột nhưng ko move -> shape ko đc vẽ
                this.positionXRectStart = position.x
                this.positionYRectStart = position.y

                return
            }

            // click khung viền transformer -> ko làm gì cả
            const clickedOnTransformer = target.getParent().className === 'Transformer'

            if (clickedOnTransformer) {
                return
            }

            // lấy ra name của shape đc click
            const name = target.name()

            const rectangle = this.rectangles.find((r) => r.name === name)
            const polygon = this.polygons.find((r) => r.name === name)
            const line = this.lines.find((r) => r.name === name)

            this.shapeNameChoosen = line || rectangle || polygon ? name : ''

            this.updateTransformer()

        },
        handleStageMouseMove(e) {
            // Tọa độ x,y của mouse
            const position = e.target.getStage().getPointerPosition();

            this.posX = position.x
            this.posY = position.y

            // no drawing - skipping
            if (!this.isDrawing) {
                return;
            }

            if (this.typeOfShapeChoosen == 'Polygon') {
                let newestShape = this.polygons[this.polygons.length - 1]

                if (!this.isHoldingShift) {
                    newestShape.points = newestShape.points.concat([position.x, position.y])
                }
            }

            if (this.typeOfShapeChoosen == 'Line') {
                let newestShape = this.lines[this.lines.length - 1]
                // add point
                newestShape.points = newestShape.points_0.concat([position.x, position.y])

                // // replace last
                // this.lines.splice(this.lines.length - 1, 1, newestShape);
            }

            // Tính toán (x2, y2), (width, height)
            /* Case 1: Vẽ từ trải qua phải, từ trên xuống dưới */
            if (this.typeOfShapeChoosen == 'Rectangle') {
                let newestShape = this.rectangles[this.rectangles.length - 1]

                newestShape.x2 = position.x
                newestShape.y2 = position.y

                newestShape.x2_0 = position.x
                newestShape.y2_0 = position.y

                /* Case 2:
                    - Vẽ từ phải -> trái: width < 0
                    - Vẽ từ dưới -> trên: height < 0
                    - Gọi thêm func calcCoordinatesRectangle() khi nhả chuột (mouseUp) để tính toán lại coordinates
                */
                newestShape.width = newestShape.x2 - newestShape.x
                newestShape.height = newestShape.y2 - newestShape.y
            }
        },
        handleStageMouseUp(e) {
            const position = e.target.getStage().getPointerPosition();

            if (this.isHoldingShift) {
                console.log(21);
                if (this.typeOfShapeChoosen == 'Polygon' && this.isPolygonCreated) {
                    let newestShape = this.polygons[this.polygons.length - 1]

                    newestShape.points = newestShape.points.concat([position.x, position.y])
                }
            } else {
                this.isPolygonCreated = false

                // tự động xóa shape vừa đc sinh ra sau khi click chuột mà ko move
                if (this.positionXRectStart == position.x && this.positionYRectStart == position.y) {
                    console.log(1);

                    if (this.typeOfShapeChoosen == 'Polygon') {
                        this.polygons.splice(this.polygons.length - 1, 1);
                    }

                    if (this.typeOfShapeChoosen == 'Line') {
                        this.lines.splice(this.lines.length - 1, 1);
                    }

                    if (this.typeOfShapeChoosen == 'Rectangle') {
                        this.rectangles.splice(this.rectangles.length - 1, 1);
                    }
                } else {
                    if (this.typeOfShapeChoosen == 'Line' && !this.shapeNameChoosen) {
                        console.log(2);
                        let newestShape = this.lines[this.lines.length - 1]
                        newestShape.points_0 = newestShape.points
                    }
                }

                this.isDrawing = false;
                this.positionXRectStart = 0
                this.positionYRectStart = 0
            }

            // Tính toán lại coordinates cho case 2 Rectangles
            this.calcCoordinatesRectangle()

            // thêm shape vào json obj để bắn api sang core
            // this.addShapeToJson()

            // xóa shape khi nhấn phím Delete
            this.handleRemoveShape(e)


        },
        calcCoordinatesRectangle() {
            if (this.typeOfShapeChoosen == 'Rectangle') {
                let shapeSelected = this.rectangles[this.rectangles.length - 1]

                let absWidth = Math.abs(shapeSelected.width)
                let absHeight = Math.abs(shapeSelected.height)

                // Case vẽ từ phải -> trái
                if (shapeSelected.width < 0) {
                    shapeSelected.x = shapeSelected.x - absWidth
                    shapeSelected.x2 = shapeSelected.x + absWidth
                    shapeSelected.x2_0 = shapeSelected.x + absWidth
                    shapeSelected.width_0 = absWidth
                }

                // Case vẽ từ dưới -> trên
                if (shapeSelected.height < 0) {
                    shapeSelected.y = shapeSelected.y - absHeight
                    shapeSelected.y2 = shapeSelected.y + absHeight
                    shapeSelected.y2_0 = shapeSelected.y + absHeight
                    shapeSelected.height_0 = absHeight
                }

                shapeSelected.width = absWidth
                shapeSelected.height = absHeight
            }
        },
        addShapeToJson() {
            if (this.typeOfShapeChoosen == 'Rectangle') {
                let lastRectangle = this.rectangles[this.rectangles.length - 1];
                let item = {
                    "label": this.labelChoosen,
                    "points": [
                        [
                            lastRectangle.x,
                            lastRectangle.y
                        ],
                        [
                            lastRectangle.x + lastRectangle.width,
                            lastRectangle.y + lastRectangle.height
                        ]
                    ],
                    "group_id": null,
                    "shape_type": "rectangle",
                    "flags": {}
                }

                this.jsonResult = [...this.jsonResult, item]
            }
        },
        handleRemoveShape() {
            window.addEventListener('keypress', (e) => {
                if (e.key == 'Delete') {
                    let _this = this

                    let indexLine = findIndex(this.lines, function(o) { return o.name == _this.shapeNameChoosen; });
                    let indexPolygon = findIndex(this.polygons, function(o) { return o.name == _this.shapeNameChoosen; });
                    let indexRectangle = findIndex(this.rectangles, function(o) { return o.name == _this.shapeNameChoosen; });

                    if (indexLine > -1) {
                        this.lines.splice(indexLine, 1);
                    }
                    if (indexPolygon > -1) {
                        this.polygons.splice(indexPolygon, 1);
                    }

                    if (indexRectangle > -1) {
                        this.rectangles.splice(indexRectangle, 1);
                    }

                    this.shapeNameChoosen = ''
                    this.updateTransformer()
                }
            });
        },
        handleShiftKeypress() {
            window.addEventListener('keydown', (e) => {
                if (this.typeOfShapeChoosen == 'Polygon' && e.key == 'Shift') {
                    this.isHoldingShift = true
                    this.isDrawing = true
                }
            });
            window.addEventListener('keyup', (e) => {
                if (this.typeOfShapeChoosen == 'Polygon' && this.isHoldingShift) {
                    this.isHoldingShift = false
                    this.isDrawing = false
                    this.isPolygonCreated = false
                }
            });
        },
        handleSpaceKeypress () {
            let _this = this

            window.addEventListener('keydown', function(e) {
                if(e.keyCode == 32 && e.target == document.body) {
                    console.log('dasd');
                    _this.isHoldingSpace = true
                    e.preventDefault();
                }
            });

            window.addEventListener('keyup', (e) => {
                if(e.keyCode == 32 && e.target == document.body && this.isHoldingSpace) {
                    this.isHoldingSpace = false
                }
            });
        },
        handleUndo() {
            window.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.code == 'KeyZ') {
                    let allShapeName = [...this.lines, ...this.polygons, ...this.rectangles]

                    if (!allShapeName.length) {
                        return
                    }

                    allShapeName = sortBy(allShapeName, ['name'])

                    let newsetShapeName = allShapeName[allShapeName.length - 1].name

                    let indexLine = findIndex(this.lines, function(o) { return o.name == newsetShapeName; });
                    let indexPolygon = findIndex(this.polygons, function(o) { return o.name == newsetShapeName; });
                    let indexRectangle = findIndex(this.rectangles, function(o) { return o.name == newsetShapeName; });

                    if (indexLine > -1) {
                        this.lines.splice(indexLine, 1);
                    }
                    if (indexPolygon > -1) {
                        this.polygons.splice(indexPolygon, 1);
                    }
                    if (indexRectangle > -1) {
                        this.rectangles.splice(indexRectangle, 1);
                    }

                    this.shapeNameChoosen = ''
                    this.updateTransformer()
                }
            });
        },
        handleDragEnd(e) {
            console.log('x-y: ', e.target.x(), e.target.y());
            let _this = this

            let rectangle = this.rectangles.find((r) => r.name === this.shapeNameChoosen)
            let line = this.lines.find((r) => r.name === this.shapeNameChoosen)

            let indexLine = findIndex(this.lines, function(o) { return o.name == _this.shapeNameChoosen; });

            if (rectangle) {
                rectangle.x = e.target.x()
                rectangle.y = e.target.y()
                rectangle.x2 = rectangle.x + rectangle.width
                rectangle.y2 = rectangle.y + rectangle.height
            }

            if (line) {
                let newPoints = []
                line.points_0.forEach((value, key) => {
                    if (key % 2 == 0) {
                        console.log('key-value 1: ', key, value);
                        newPoints = [...newPoints, value + e.target.x()]
                    } else {
                        console.log('key-value 2: ', key, value);
                        newPoints = [...newPoints, value + e.target.y()]
                    }
                })

                console.log('newPoints: ', newPoints);

                // line.points = [ 412.203125, 246.203125, 550.203125, 248.203125 ]
                line.points = newPoints

                this.lines.splice(this.lines.length - 1, 1, lastLine);

            // line.x2 = line.x + line.width
            // line.y2 = line.y + line.height
            }

            this.$forceUpdate()
        },
        handleTransformEnd(e) {
            return

            const transformerNode = this.$refs.transformer.getNode()
            let anchor = transformerNode.getActiveAnchor()

            let target = e.target
            let position = e.target.getStage().getPointerPosition();

            let rectangle = this.rectangles.find((r) => r.name === this.shapeNameChoosen)

            // x2_0, y2_0: Tọa độ (x2, y2) ban đầu (không thay đổi khi transform)
            if (anchor == 'middle-right' || anchor == 'bottom-right') {
                rectangle.x2 = (rectangle.x2_0 * target.scaleX()) - (rectangle.x * target.scaleX() - rectangle.x)
            }
            if (anchor == 'bottom-center' || anchor == 'bottom-right') {
                rectangle.y2 = (rectangle.y2_0 * target.scaleY()) - (rectangle.y * target.scaleY() - rectangle.y)
            }

            rectangle.x = target.x()
            rectangle.y = target.y()

            console.log('scale: ', target.scaleX());
            console.log('width: ', rectangle.x, rectangle.x2, round(rectangle.x2 - rectangle.x, 0));
            // rectangle.width = rectangle.width_0 * target.scaleX()
            // rectangle.height = round(rectangle.y2 - rectangle.y, 0)
            // rectangle.height = rectangle.height + round(rectangle.y2 - rectangle.y, 0) / 2
            // rectangle.height = newY2 - rectangle.y

            this.$forceUpdate()
        },
        updateTransformer() {
            if (this.isHoldingShift) {
                return
            }

            const transformerNode = this.$refs.transformer.getNode()
            const stage = transformerNode.getStage()
            const { shapeNameChoosen } = this

            const selectedNode = stage.findOne('.' + shapeNameChoosen)

            // do nothing if selected node is allready attached
            if (selectedNode === transformerNode.node()) {
                return
            }

            if (selectedNode) {
                // attach to another node
                transformerNode.attachTo(selectedNode)
                // transformerNode.nodes([selectedNode])
            } else {
                transformerNode.detach()
                // transformerNode.nodes([])
            }
        }
    }
};
</script>

<style lang="scss">
.div-stage {
    background-image: url('@/assets/images/ex.png');
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
</style>
