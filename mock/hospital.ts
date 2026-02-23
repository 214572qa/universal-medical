// @ts-ignore
import Mock from 'mockjs';

// 订单状态内存存储，用于模拟持久化状态
const orderStatusStore: Record<string, number> = {};

// ==================== 城市地址数据 ====================
// 三级地理层级结构：省 → 市 → 区/县

// 省级数据（parentId='86'）
const provinceData = [
  { id: 110000, name: '北京市', value: '110000', hasChildren: true },
  { id: 120000, name: '天津市', value: '120000', hasChildren: true },
  { id: 310000, name: '上海市', value: '310000', hasChildren: true },
  { id: 440000, name: '广东省', value: '440000', hasChildren: true },
  { id: 330000, name: '浙江省', value: '330000', hasChildren: true },
  { id: 320000, name: '江苏省', value: '320000', hasChildren: true },
  { id: 510000, name: '四川省', value: '510000', hasChildren: true },
  { id: 420000, name: '湖北省', value: '420000', hasChildren: true },
  { id: 430000, name: '湖南省', value: '430000', hasChildren: true },
  { id: 370000, name: '山东省', value: '370000', hasChildren: true },
];

// 市级数据（按省份分组）
const cityData: Record<string, Array<{ id: number; name: string; value: string; hasChildren: boolean }>> = {
  // 北京市（直辖市，市级即区级）
  '110000': [
    { id: 110100, name: '市辖区', value: '110100', hasChildren: true },
  ],
  // 天津市
  '120000': [
    { id: 120100, name: '市辖区', value: '120100', hasChildren: true },
  ],
  // 上海市
  '310000': [
    { id: 310100, name: '市辖区', value: '310100', hasChildren: true },
  ],
  // 广东省
  '440000': [
    { id: 440100, name: '广州市', value: '440100', hasChildren: true },
    { id: 440300, name: '深圳市', value: '440300', hasChildren: true },
    { id: 440600, name: '佛山市', value: '440600', hasChildren: true },
    { id: 441900, name: '东莞市', value: '441900', hasChildren: true },
    { id: 440400, name: '珠海市', value: '440400', hasChildren: true },
  ],
  // 浙江省
  '330000': [
    { id: 330100, name: '杭州市', value: '330100', hasChildren: true },
    { id: 330200, name: '宁波市', value: '330200', hasChildren: true },
    { id: 330300, name: '温州市', value: '330300', hasChildren: true },
    { id: 330400, name: '嘉兴市', value: '330400', hasChildren: true },
  ],
  // 江苏省
  '320000': [
    { id: 320100, name: '南京市', value: '320100', hasChildren: true },
    { id: 320500, name: '苏州市', value: '320500', hasChildren: true },
    { id: 320200, name: '无锡市', value: '320200', hasChildren: true },
    { id: 320400, name: '常州市', value: '320400', hasChildren: true },
  ],
  // 四川省
  '510000': [
    { id: 510100, name: '成都市', value: '510100', hasChildren: true },
    { id: 510300, name: '自贡市', value: '510300', hasChildren: true },
    { id: 510400, name: '攀枝花市', value: '510400', hasChildren: true },
    { id: 510700, name: '绵阳市', value: '510700', hasChildren: true },
  ],
  // 湖北省
  '420000': [
    { id: 420100, name: '武汉市', value: '420100', hasChildren: true },
    { id: 420200, name: '黄石市', value: '420200', hasChildren: true },
    { id: 420300, name: '十堰市', value: '420300', hasChildren: true },
    { id: 420500, name: '宜昌市', value: '420500', hasChildren: true },
  ],
  // 湖南省
  '430000': [
    { id: 430100, name: '长沙市', value: '430100', hasChildren: true },
    { id: 430200, name: '株洲市', value: '430200', hasChildren: true },
    { id: 430300, name: '湘潭市', value: '430300', hasChildren: true },
    { id: 430400, name: '衡阳市', value: '430400', hasChildren: true },
  ],
  // 山东省
  '370000': [
    { id: 370100, name: '济南市', value: '370100', hasChildren: true },
    { id: 370200, name: '青岛市', value: '370200', hasChildren: true },
    { id: 370300, name: '淄博市', value: '370300', hasChildren: true },
    { id: 370400, name: '枣庄市', value: '370400', hasChildren: true },
  ],
};

// 区/县级数据（按市分组）
const districtData: Record<string, Array<{ id: number; name: string; value: string; hasChildren: boolean }>> = {
  // 北京市辖区
  '110100': [
    { id: 110101, name: '东城区', value: '110101', hasChildren: false },
    { id: 110102, name: '西城区', value: '110102', hasChildren: false },
    { id: 110105, name: '朝阳区', value: '110105', hasChildren: false },
    { id: 110106, name: '丰台区', value: '110106', hasChildren: false },
    { id: 110107, name: '石景山区', value: '110107', hasChildren: false },
    { id: 110108, name: '海淀区', value: '110108', hasChildren: false },
    { id: 110109, name: '门头沟区', value: '110109', hasChildren: false },
    { id: 110111, name: '房山区', value: '110111', hasChildren: false },
    { id: 110112, name: '通州区', value: '110112', hasChildren: false },
    { id: 110113, name: '顺义区', value: '110113', hasChildren: false },
    { id: 110114, name: '昌平区', value: '110114', hasChildren: false },
    { id: 110115, name: '大兴区', value: '110115', hasChildren: false },
    { id: 110116, name: '怀柔区', value: '110116', hasChildren: false },
    { id: 110117, name: '平谷区', value: '110117', hasChildren: false },
    { id: 110118, name: '密云区', value: '110118', hasChildren: false },
    { id: 110119, name: '延庆区', value: '110119', hasChildren: false },
  ],
  // 天津市辖区
  '120100': [
    { id: 120101, name: '和平区', value: '120101', hasChildren: false },
    { id: 120102, name: '河东区', value: '120102', hasChildren: false },
    { id: 120103, name: '河西区', value: '120103', hasChildren: false },
    { id: 120104, name: '南开区', value: '120104', hasChildren: false },
    { id: 120105, name: '河北区', value: '120105', hasChildren: false },
    { id: 120106, name: '红桥区', value: '120106', hasChildren: false },
    { id: 120110, name: '东丽区', value: '120110', hasChildren: false },
    { id: 120111, name: '西青区', value: '120111', hasChildren: false },
    { id: 120112, name: '津南区', value: '120112', hasChildren: false },
    { id: 120113, name: '北辰区', value: '120113', hasChildren: false },
    { id: 120114, name: '武清区', value: '120114', hasChildren: false },
    { id: 120115, name: '宝坻区', value: '120115', hasChildren: false },
    { id: 120116, name: '滨海新区', value: '120116', hasChildren: false },
  ],
  // 上海市辖区
  '310100': [
    { id: 310101, name: '黄浦区', value: '310101', hasChildren: false },
    { id: 310104, name: '徐汇区', value: '310104', hasChildren: false },
    { id: 310105, name: '长宁区', value: '310105', hasChildren: false },
    { id: 310106, name: '静安区', value: '310106', hasChildren: false },
    { id: 310107, name: '普陀区', value: '310107', hasChildren: false },
    { id: 310109, name: '虹口区', value: '310109', hasChildren: false },
    { id: 310110, name: '杨浦区', value: '310110', hasChildren: false },
    { id: 310112, name: '闵行区', value: '310112', hasChildren: false },
    { id: 310113, name: '宝山区', value: '310113', hasChildren: false },
    { id: 310114, name: '嘉定区', value: '310114', hasChildren: false },
    { id: 310115, name: '浦东新区', value: '310115', hasChildren: false },
    { id: 310116, name: '金山区', value: '310116', hasChildren: false },
    { id: 310117, name: '松江区', value: '310117', hasChildren: false },
    { id: 310118, name: '青浦区', value: '310118', hasChildren: false },
    { id: 310120, name: '奉贤区', value: '310120', hasChildren: false },
    { id: 310151, name: '崇明区', value: '310151', hasChildren: false },
  ],
  // 广州市
  '440100': [
    { id: 440103, name: '荔湾区', value: '440103', hasChildren: false },
    { id: 440104, name: '越秀区', value: '440104', hasChildren: false },
    { id: 440105, name: '海珠区', value: '440105', hasChildren: false },
    { id: 440106, name: '天河区', value: '440106', hasChildren: false },
    { id: 440111, name: '白云区', value: '440111', hasChildren: false },
    { id: 440112, name: '黄埔区', value: '440112', hasChildren: false },
    { id: 440113, name: '番禺区', value: '440113', hasChildren: false },
    { id: 440114, name: '花都区', value: '440114', hasChildren: false },
    { id: 440115, name: '南沙区', value: '440115', hasChildren: false },
    { id: 440117, name: '从化区', value: '440117', hasChildren: false },
    { id: 440118, name: '增城区', value: '440118', hasChildren: false },
  ],
  // 深圳市
  '440300': [
    { id: 440303, name: '罗湖区', value: '440303', hasChildren: false },
    { id: 440304, name: '福田区', value: '440304', hasChildren: false },
    { id: 440305, name: '南山区', value: '440305', hasChildren: false },
    { id: 440306, name: '宝安区', value: '440306', hasChildren: false },
    { id: 440307, name: '龙岗区', value: '440307', hasChildren: false },
    { id: 440308, name: '盐田区', value: '440308', hasChildren: false },
    { id: 440309, name: '龙华区', value: '440309', hasChildren: false },
    { id: 440310, name: '坪山区', value: '440310', hasChildren: false },
    { id: 440311, name: '光明区', value: '440311', hasChildren: false },
  ],
  // 佛山市
  '440600': [
    { id: 440604, name: '禅城区', value: '440604', hasChildren: false },
    { id: 440605, name: '南海区', value: '440605', hasChildren: false },
    { id: 440606, name: '顺德区', value: '440606', hasChildren: false },
    { id: 440607, name: '三水区', value: '440607', hasChildren: false },
    { id: 440608, name: '高明区', value: '440608', hasChildren: false },
  ],
  // 东莞市（地级市，无下辖区县）
  '441900': [
    { id: 441900001, name: '莞城街道', value: '441900001', hasChildren: false },
    { id: 441900002, name: '南城街道', value: '441900002', hasChildren: false },
    { id: 441900003, name: '东城街道', value: '441900003', hasChildren: false },
    { id: 441900004, name: '万江街道', value: '441900004', hasChildren: false },
    { id: 441900005, name: '石碣镇', value: '441900005', hasChildren: false },
    { id: 441900006, name: '石龙镇', value: '441900006', hasChildren: false },
    { id: 441900007, name: '茶山镇', value: '441900007', hasChildren: false },
    { id: 441900008, name: '石排镇', value: '441900008', hasChildren: false },
    { id: 441900009, name: '企石镇', value: '441900009', hasChildren: false },
    { id: 441900010, name: '横沥镇', value: '441900010', hasChildren: false },
  ],
  // 珠海市
  '440400': [
    { id: 440402, name: '香洲区', value: '440402', hasChildren: false },
    { id: 440403, name: '斗门区', value: '440403', hasChildren: false },
    { id: 440404, name: '金湾区', value: '440404', hasChildren: false },
  ],
  // 杭州市
  '330100': [
    { id: 330102, name: '上城区', value: '330102', hasChildren: false },
    { id: 330103, name: '下城区', value: '330103', hasChildren: false },
    { id: 330104, name: '江干区', value: '330104', hasChildren: false },
    { id: 330105, name: '拱墅区', value: '330105', hasChildren: false },
    { id: 330106, name: '西湖区', value: '330106', hasChildren: false },
    { id: 330108, name: '滨江区', value: '330108', hasChildren: false },
    { id: 330109, name: '萧山区', value: '330109', hasChildren: false },
    { id: 330110, name: '余杭区', value: '330110', hasChildren: false },
    { id: 330111, name: '富阳区', value: '330111', hasChildren: false },
    { id: 330112, name: '临安区', value: '330112', hasChildren: false },
  ],
  // 宁波市
  '330200': [
    { id: 330203, name: '海曙区', value: '330203', hasChildren: false },
    { id: 330205, name: '江北区', value: '330205', hasChildren: false },
    { id: 330206, name: '北仑区', value: '330206', hasChildren: false },
    { id: 330211, name: '镇海区', value: '330211', hasChildren: false },
    { id: 330212, name: '鄞州区', value: '330212', hasChildren: false },
    { id: 330213, name: '奉化区', value: '330213', hasChildren: false },
  ],
  // 温州市
  '330300': [
    { id: 330302, name: '鹿城区', value: '330302', hasChildren: false },
    { id: 330303, name: '龙湾区', value: '330303', hasChildren: false },
    { id: 330304, name: '瓯海区', value: '330304', hasChildren: false },
    { id: 330305, name: '洞头区', value: '330305', hasChildren: false },
  ],
  // 嘉兴市
  '330400': [
    { id: 330402, name: '南湖区', value: '330402', hasChildren: false },
    { id: 330411, name: '秀洲区', value: '330411', hasChildren: false },
  ],
  // 南京市
  '320100': [
    { id: 320102, name: '玄武区', value: '320102', hasChildren: false },
    { id: 320104, name: '秦淮区', value: '320104', hasChildren: false },
    { id: 320105, name: '建邺区', value: '320105', hasChildren: false },
    { id: 320106, name: '鼓楼区', value: '320106', hasChildren: false },
    { id: 320111, name: '浦口区', value: '320111', hasChildren: false },
    { id: 320113, name: '栖霞区', value: '320113', hasChildren: false },
    { id: 320114, name: '雨花台区', value: '320114', hasChildren: false },
    { id: 320115, name: '江宁区', value: '320115', hasChildren: false },
    { id: 320116, name: '六合区', value: '320116', hasChildren: false },
    { id: 320117, name: '溧水区', value: '320117', hasChildren: false },
    { id: 320118, name: '高淳区', value: '320118', hasChildren: false },
  ],
  // 苏州市
  '320500': [
    { id: 320505, name: '虎丘区', value: '320505', hasChildren: false },
    { id: 320506, name: '吴中区', value: '320506', hasChildren: false },
    { id: 320507, name: '相城区', value: '320507', hasChildren: false },
    { id: 320508, name: '姑苏区', value: '320508', hasChildren: false },
    { id: 320509, name: '吴江区', value: '320509', hasChildren: false },
    { id: 320581, name: '常熟市', value: '320581', hasChildren: false },
    { id: 320582, name: '张家港市', value: '320582', hasChildren: false },
    { id: 320583, name: '昆山市', value: '320583', hasChildren: false },
    { id: 320585, name: '太仓市', value: '320585', hasChildren: false },
  ],
  // 无锡市
  '320200': [
    { id: 320205, name: '锡山区', value: '320205', hasChildren: false },
    { id: 320206, name: '惠山区', value: '320206', hasChildren: false },
    { id: 320211, name: '滨湖区', value: '320211', hasChildren: false },
    { id: 320213, name: '梁溪区', value: '320213', hasChildren: false },
    { id: 320214, name: '新吴区', value: '320214', hasChildren: false },
    { id: 320281, name: '江阴市', value: '320281', hasChildren: false },
    { id: 320282, name: '宜兴市', value: '320282', hasChildren: false },
  ],
  // 常州市
  '320400': [
    { id: 320402, name: '天宁区', value: '320402', hasChildren: false },
    { id: 320404, name: '钟楼区', value: '320404', hasChildren: false },
    { id: 320411, name: '新北区', value: '320411', hasChildren: false },
    { id: 320412, name: '武进区', value: '320412', hasChildren: false },
    { id: 320413, name: '金坛区', value: '320413', hasChildren: false },
  ],
  // 成都市
  '510100': [
    { id: 510104, name: '锦江区', value: '510104', hasChildren: false },
    { id: 510105, name: '青羊区', value: '510105', hasChildren: false },
    { id: 510106, name: '金牛区', value: '510106', hasChildren: false },
    { id: 510107, name: '武侯区', value: '510107', hasChildren: false },
    { id: 510108, name: '成华区', value: '510108', hasChildren: false },
    { id: 510112, name: '龙泉驿区', value: '510112', hasChildren: false },
    { id: 510113, name: '青白江区', value: '510113', hasChildren: false },
    { id: 510114, name: '新都区', value: '510114', hasChildren: false },
    { id: 510115, name: '温江区', value: '510115', hasChildren: false },
    { id: 510116, name: '双流区', value: '510116', hasChildren: false },
    { id: 510117, name: '郫都区', value: '510117', hasChildren: false },
    { id: 510118, name: '新津区', value: '510118', hasChildren: false },
  ],
  // 自贡市
  '510300': [
    { id: 510302, name: '自流井区', value: '510302', hasChildren: false },
    { id: 510303, name: '贡井区', value: '510303', hasChildren: false },
    { id: 510304, name: '大安区', value: '510304', hasChildren: false },
    { id: 510311, name: '沿滩区', value: '510311', hasChildren: false },
  ],
  // 攀枝花市
  '510400': [
    { id: 510402, name: '东区', value: '510402', hasChildren: false },
    { id: 510403, name: '西区', value: '510403', hasChildren: false },
    { id: 510411, name: '仁和区', value: '510411', hasChildren: false },
  ],
  // 绵阳市
  '510700': [
    { id: 510703, name: '涪城区', value: '510703', hasChildren: false },
    { id: 510704, name: '游仙区', value: '510704', hasChildren: false },
    { id: 510705, name: '安州区', value: '510705', hasChildren: false },
  ],
  // 武汉市
  '420100': [
    { id: 420102, name: '江岸区', value: '420102', hasChildren: false },
    { id: 420103, name: '江汉区', value: '420103', hasChildren: false },
    { id: 420104, name: '硚口区', value: '420104', hasChildren: false },
    { id: 420105, name: '汉阳区', value: '420105', hasChildren: false },
    { id: 420106, name: '武昌区', value: '420106', hasChildren: false },
    { id: 420107, name: '青山区', value: '420107', hasChildren: false },
    { id: 420111, name: '洪山区', value: '420111', hasChildren: false },
    { id: 420112, name: '东西湖区', value: '420112', hasChildren: false },
    { id: 420113, name: '汉南区', value: '420113', hasChildren: false },
    { id: 420114, name: '蔡甸区', value: '420114', hasChildren: false },
    { id: 420115, name: '江夏区', value: '420115', hasChildren: false },
    { id: 420116, name: '黄陂区', value: '420116', hasChildren: false },
    { id: 420117, name: '新洲区', value: '420117', hasChildren: false },
  ],
  // 黄石市
  '420200': [
    { id: 420202, name: '黄石港区', value: '420202', hasChildren: false },
    { id: 420203, name: '西塞山区', value: '420203', hasChildren: false },
    { id: 420204, name: '下陆区', value: '420204', hasChildren: false },
    { id: 420205, name: '铁山区', value: '420205', hasChildren: false },
  ],
  // 十堰市
  '420300': [
    { id: 420302, name: '茅箭区', value: '420302', hasChildren: false },
    { id: 420303, name: '张湾区', value: '420303', hasChildren: false },
    { id: 420304, name: '郧阳区', value: '420304', hasChildren: false },
  ],
  // 宜昌市
  '420500': [
    { id: 420502, name: '西陵区', value: '420502', hasChildren: false },
    { id: 420503, name: '伍家岗区', value: '420503', hasChildren: false },
    { id: 420504, name: '点军区', value: '420504', hasChildren: false },
    { id: 420505, name: '猇亭区', value: '420505', hasChildren: false },
    { id: 420506, name: '夷陵区', value: '420506', hasChildren: false },
  ],
  // 长沙市
  '430100': [
    { id: 430102, name: '芙蓉区', value: '430102', hasChildren: false },
    { id: 430103, name: '天心区', value: '430103', hasChildren: false },
    { id: 430104, name: '岳麓区', value: '430104', hasChildren: false },
    { id: 430105, name: '开福区', value: '430105', hasChildren: false },
    { id: 430111, name: '雨花区', value: '430111', hasChildren: false },
    { id: 430112, name: '望城区', value: '430112', hasChildren: false },
    { id: 430121, name: '长沙县', value: '430121', hasChildren: false },
  ],
  // 株洲市
  '430200': [
    { id: 430202, name: '荷塘区', value: '430202', hasChildren: false },
    { id: 430203, name: '芦淞区', value: '430203', hasChildren: false },
    { id: 430204, name: '石峰区', value: '430204', hasChildren: false },
    { id: 430211, name: '天元区', value: '430211', hasChildren: false },
  ],
  // 湘潭市
  '430300': [
    { id: 430302, name: '雨湖区', value: '430302', hasChildren: false },
    { id: 430304, name: '岳塘区', value: '430304', hasChildren: false },
  ],
  // 衡阳市
  '430400': [
    { id: 430405, name: '珠晖区', value: '430405', hasChildren: false },
    { id: 430406, name: '雁峰区', value: '430406', hasChildren: false },
    { id: 430407, name: '石鼓区', value: '430407', hasChildren: false },
    { id: 430408, name: '蒸湘区', value: '430408', hasChildren: false },
    { id: 430412, name: '南岳区', value: '430412', hasChildren: false },
  ],
  // 济南市
  '370100': [
    { id: 370102, name: '历下区', value: '370102', hasChildren: false },
    { id: 370103, name: '市中区', value: '370103', hasChildren: false },
    { id: 370104, name: '槐荫区', value: '370104', hasChildren: false },
    { id: 370105, name: '天桥区', value: '370105', hasChildren: false },
    { id: 370112, name: '历城区', value: '370112', hasChildren: false },
    { id: 370113, name: '长清区', value: '370113', hasChildren: false },
    { id: 370114, name: '章丘区', value: '370114', hasChildren: false },
    { id: 370115, name: '济阳区', value: '370115', hasChildren: false },
    { id: 370116, name: '莱芜区', value: '370116', hasChildren: false },
    { id: 370117, name: '钢城区', value: '370117', hasChildren: false },
  ],
  // 青岛市
  '370200': [
    { id: 370202, name: '市南区', value: '370202', hasChildren: false },
    { id: 370203, name: '市北区', value: '370203', hasChildren: false },
    { id: 370211, name: '黄岛区', value: '370211', hasChildren: false },
    { id: 370212, name: '崂山区', value: '370212', hasChildren: false },
    { id: 370213, name: '李沧区', value: '370213', hasChildren: false },
    { id: 370214, name: '城阳区', value: '370214', hasChildren: false },
    { id: 370215, name: '即墨区', value: '370215', hasChildren: false },
  ],
  // 淄博市
  '370300': [
    { id: 370302, name: '淄川区', value: '370302', hasChildren: false },
    { id: 370303, name: '张店区', value: '370303', hasChildren: false },
    { id: 370304, name: '博山区', value: '370304', hasChildren: false },
    { id: 370305, name: '临淄区', value: '370305', hasChildren: false },
    { id: 370306, name: '周村区', value: '370306', hasChildren: false },
  ],
  // 枣庄市
  '370400': [
    { id: 370402, name: '市中区', value: '370402', hasChildren: false },
    { id: 370403, name: '薛城区', value: '370403', hasChildren: false },
    { id: 370404, name: '峄城区', value: '370404', hasChildren: false },
    { id: 370405, name: '台儿庄区', value: '370405', hasChildren: false },
    { id: 370406, name: '山亭区', value: '370406', hasChildren: false },
  ],
};

// 生成城市数据的辅助函数
const generateCityItem = (item: { id: number; name: string; value: string; hasChildren: boolean }, parentId: string | number) => ({
  id: item.id,
  createTime: '2021-01-01 00:00:00',
  updateTime: '2021-01-01 00:00:00',
  isDeleted: 0,
  param: {},
  parentId: Number(parentId),
  dictCode: null,
  value: item.value,
  name: item.name,
  hasChildren: item.hasChildren
});
// ==================== 城市地址数据结束 ====================

// 共享的就诊人数据列表（订单和就诊人接口共用）
const sharedPatientList = [
  { id: 10001, name: '张三' },
  { id: 10002, name: '李四' },
  { id: 10003, name: '王五' },
  { id: 10004, name: '赵六' },
  { id: 10005, name: '孙七' },
  { id: 10006, name: '周八' },
  { id: 10007, name: '吴九' },
  { id: 10008, name: '郑十' }
];

// 内存中存储固定的订单数据，确保分页时数据稳定
let mockOrderList: any[] | null = null;
let mockTotalCount: number = 0;

// 生成固定订单数据的函数
const generateMockOrders = () => {
  if (mockOrderList) return; // 如果已生成则不再重新生成

  const statusOptions = [
    { code: -1, text: '已取消' },
    { code: 0, text: '预约成功，待支付' },
    { code: 1, text: '已支付' }
  ];

  // 固定生成 25 条订单数据
  mockTotalCount = 25;
  mockOrderList = [];

  for (let i = 0; i < mockTotalCount; i++) {
    // 按顺序循环分配状态，确保每种状态都有
    const statusObj = statusOptions[i % 3];

    const reserveDate = Mock.mock('@date("yyyy-MM-dd")');
    const title = Mock.mock('@pick(["主任医师", "副主任医师", "主治医师"])');
    const amountMap: Record<string, number> = { '主任医师': 500, '副主任医师': 300, '主治医师': 100 };

    // 使用共享的就诊人数据
    const patient = sharedPatientList[i % sharedPatientList.length];

    mockOrderList.push({
      id: 100000 + i, // 固定ID，从100000开始递增
      orderNo: 'O20240615' + String(1000 + i).padStart(4, '0'),
      hoscode: String(1000 + (i % 500)),
      hosname: ['风无动医院', '然做团医院', '族县医院', '市王医院', '海华医院'][i % 5],
      depcode: '200040879',
      depname: ['内科', '外科', '儿科', '妇科', '眼科'][i % 5],
      scheduleId: '44000019861003834' + (i % 10),
      title: title,
      reserveDate: reserveDate,
      reserveTime: i % 2 === 0 ? '上午' : '下午',
      patientId: patient.id,
      patientName: patient.name,
      patientPhone: '1916126' + String(1000 + i).padStart(4, '0'),
      hosRecordId: '13000019931017481' + (i % 10),
      number: (i % 50) + 1,
      fetchTime: `${reserveDate} 08:00:00`,
      fetchAddress: ['一楼大厅自助取号机', '二楼挂号处', '三楼门诊分诊台'][i % 3],
      amount: amountMap[title],
      quitTime: `${reserveDate} 15:30:00`,
      orderStatus: statusObj.code,
      createTime: '2024-06-15 08:30:00',
      updateTime: '2024-06-15 08:30:00',
      param: {
        orderStatusString: statusObj.text
      }
    });
  }
};

// 1. 按地区→等级二级分类生成408条模拟数据
const content: any[] = [];

// 北京17个行政区（含空白区）
const districts = [
  { code: '110101', name: '东城区' },
  { code: '110102', name: '西城区' },
  { code: '110105', name: '朝阳区' },
  { code: '110106', name: '丰台区' },
  { code: '110107', name: '石景山区' },
  { code: '110108', name: '海淀区' },
  { code: '110109', name: '门头沟区' },
  { code: '110111', name: '房山区' },
  { code: '110112', name: '通州区' },
  { code: '110113', name: '顺义区' },
  { code: '110114', name: '昌平区' },
  { code: '110115', name: '大兴区' },
  { code: '110116', name: '怀柔区' },
  { code: '110117', name: '平谷区' },
  { code: '110118', name: '密云区' },
  { code: '110119', name: '延庆区' },
  { code: '110199', name: '空白区' } // 空白区
];

// 国家等级标准
const levels = [
  { value: 1, name: '三级甲等' },
  { value: 2, name: '三级乙等' },
  { value: 3, name: '二级甲等' },
  { value: 4, name: '二级乙等' },
  { value: 5, name: '一级医院' }
];

// 生成数据：每区24家医院（空白区0家），总计408家
let idCounter = 1;
districts.forEach((district, districtIndex) => {
  if (district.code === '110199') return; // 跳过空白区

  levels.forEach((level, levelIndex) => {
    // 每等级6家医院
    for (let i = 0; i < 6; i++) {
      const hosname = `${district.name}第${i + 1}${level.name}医院`;
      const logoText = hosname.substring(0, 4);
      const images = [
        '/images/1.png', '/images/2.png', '/images/3.png', '/images/4.png', '/images/5.png',
        '/images/6.png', '/images/7.png', '/images/8.png', '/images/9.png', '/images/10.png',
      ];
      const logoUrl = images[(idCounter - 1) % images.length];
      const address = `北京市${district.name}${Mock.mock('@cword(2,5)')}路${Mock.mock('@integer(1,999)')}号`;
      const intro = `${hosname}始建于${Mock.mock('@integer(1900, 2010)')}年，是集医疗、教学、科研于一体的大型综合性${level.name}。医院坐落于${address}，交通便利。作为${district.name}重点建设的医疗机构，拥有床位${Mock.mock('@integer(500, 3000)')}张，年门诊量超过${Mock.mock('@integer(100, 500)')}万人次。`;

      content.push(Mock.mock({
        'id': idCounter++,
        'hoscode': 1000 + idCounter,
        'hosname': hosname,
        'name': hosname,
        'hostype': level.value,
        'provinceCode': '110000',
        'cityCode': '110100',
        'districtCode': district.code,
        'address': address,
        'logoData': logoUrl,
        'intro': intro,
        'route': '乘车路线：乘坐地铁${Mock.mock("@integer(1,15)")}号线至${district.name}站下车，步行约${Mock.mock("@integer(200,800)")}米即到。',
        'status|0-1': 1,
        'bookingRule': {
          'cycle|1-30': 7,
          'releaseTime': '08:30',
          'stopTime': '11:30',
          'quitDay': 0,
          'quitTime': '15:30',
          'rule': [
            '1. 预约挂号实行实名制，请提供患者本人真实身份证件。',
            '2. 每日08:30开始放号，可预约未来7天的号源。',
            '3. 就诊当日请务必携带身份证原件及医保卡。',
            '4. 取消预约请在就诊当日15:30前通过系统办理。'
          ]
        },
        'param': {
          'hostypeString': level.name,
          'fullAddress': address
        },
        'params': {
          'hostypeString': level.name,
          'fullAddress': address
        }
      }));
    }
  });
});

const data = { content };

export default [
  // 0. 获取城市数据接口（级联选择器懒加载）
  // 使用正则匹配，支持路径参数
  {
    url: /\/api\/cmn\/dict\/findByParentId\/(.+)/,
    method: 'get',
    response: (req) => {
      // 从 URL 中提取 parentId
      const url = req.url || '';
      const match = url.match(/\/api\/cmn\/dict\/findByParentId\/(.+?)(?:\?|$)/);
      const parentId = match ? match[1] : '86';
      
      console.log('[Mock] 城市数据请求, parentId:', parentId);
      
      let list: any[] = [];

      // 根据parentId返回对应层级的数据
      if (parentId === '86') {
        // 返回省级数据
        list = provinceData.map(item => generateCityItem(item, '86'));
      } else if (cityData[parentId]) {
        // 返回市级数据
        list = cityData[parentId].map(item => generateCityItem(item, parentId));
      } else if (districtData[parentId]) {
        // 返回区/县级数据
        list = districtData[parentId].map(item => generateCityItem(item, parentId));
      }

      console.log('[Mock] 城市数据响应, 数据条数:', list.length);

      return {
        code: 200,
        message: '成功',
        ok: true,
        data: list
      };
    }
  },

  // 1. 根据医院名称模糊查询（放在最前，避免被分页接口匹配）
  {
    url: '/api/hosp/hospital/findByHosname/:hosname',
    method: 'get',
    response: (req) => {
      const hosname = (req.query.hosname || (req.params && req.params.hosname) || '').trim();
      let list: any[] = [];
      if (hosname) {
        const matchedDistricts = districts.filter(d => d.name.includes(hosname));
        const byHosname = data.content.filter(item => item.hosname.includes(hosname));
        const byDistrict = matchedDistricts.length
          ? data.content.filter(item => matchedDistricts.some(md => item.districtCode === md.code))
          : [];
        const byCity = hosname.includes('北京')
          ? data.content.filter(item => item.cityCode === '110100' || item.provinceCode === '110000')
          : [];
        const merged = [...byHosname, ...byDistrict, ...byCity];
        const seen = new Set<number>();
        list = merged.filter(item => {
          if (seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        }).slice(0, 20);
      }
      return {
        code: 200,
        message: '成功',
        ok: true,
        data: list
      }
    }
  },

  // 2. 数据字典接口（等级 & 地区）
  {
    url: '/api/cmn/dict/findByDictCode/:dictCode',
    method: 'get',
    response: (req) => {
      const dictCode = req.query.dictCode || (req.params && req.params.dictCode);
      let list: any[] = [];

      if (dictCode === 'HosType') {
        list = levels.map(l => ({
          id: String(l.value),
          createTime: '2021-01-01 00:00:00',
          updateTime: '2021-01-01 00:00:00',
          isDeleted: 0,
          param: {},
          parentId: 10000,
          name: l.name,
          value: String(l.value),
          dictCode: 'HosType',
          hasChildren: false
        }));
      } else if (dictCode === 'Beijin') {
        list = districts.map(d => ({
          id: d.code,
          createTime: '2021-01-01 00:00:00',
          updateTime: '2021-01-01 00:00:00',
          isDeleted: 0,
          param: {},
          parentId: '110000',
          name: d.name,
          value: d.code,
          dictCode: 'Beijin',
          hasChildren: false
        }));
      } else if (dictCode === 'CertificatesType') {
        const certTypes = [
          { id: 1, name: '身份证', value: '10' },
          { id: 2, name: '户口本', value: '20' },
          { id: 3, name: '护照', value: '30' },
          { id: 4, name: '港澳通行证', value: '40' }
        ];
        list = certTypes.map(t => ({
          id: t.id,
          createTime: '2021-01-01 00:00:00',
          updateTime: '2021-01-01 00:00:00',
          isDeleted: 0,
          param: {},
          parentId: 10000,
          name: t.name,
          value: t.value,
          dictCode: 'CertificatesType',
          hasChildren: false
        }));
      }

      return {
        code: 200,
        message: '成功',
        ok: true,
        data: list
      }
    }
  },

  // 2.5. 获取排班详细信息（必须放在分页接口之前）
  {
    url: '/api/hosp/hospital/getSchedule/:scheduleId',
    method: 'get',
    response: (req) => {
      const scheduleId = req.params?.scheduleId;
      const docId = scheduleId || Mock.mock('@id');
      const title = Mock.mock('@pick(["主任医师", "副主任医师", "主治医师"])');
      const amountMap = { '主任医师': 500, '副主任医师': 300, '主治医师': 100 };

      return {
        code: 200,
        message: '成功',
        ok: true,
        data: {
          id: docId,
          createTime: Mock.mock('@datetime'),
          updateTime: Mock.mock('@datetime'),
          isDeleted: '0',
          hoscode: '1000',
          depcode: '200040879',
          title: title,
          docname: Mock.mock('@cname'),
          skill: Mock.mock('@cparagraph(1, 2)'),
          workDate: new Date().toISOString().split('T')[0],
          workTime: Mock.mock('@integer(0, 1)'),
          reservedNumber: Mock.mock('@integer(0, 30)'),
          availableNumber: Mock.mock('@integer(0, 30)'),
          amount: amountMap[title as keyof typeof amountMap],
          status: 1,
          hosScheduleId: docId,
          param: {
            dayOfWeek: Mock.mock('@pick(["周一", "周二", "周三", "周四", "周五", "周六", "周日"])'),
            depname: '神经内科',
            hosname: '北京协和医院'
          }
        }
      };
    }
  },

  // 3. 支持分页查询的接口（放在最后，避免覆盖具体接口）
  {
    url: '/api/hosp/hospital/:page/:limit',
    method: 'get',
    response: (req) => {
      // 获取分页参数
      let page = parseInt(req.query.page || (req.params && req.params.page) || 1);
      let limit = parseInt(req.query.limit || (req.params && req.params.limit) || 10);
      const url = req.url || '';
      const match = url.match(/\/api\/hosp\/hospital\/(\d+)\/(\d+)/);
      if (match) {
        const p = parseInt(match[1]);
        const l = parseInt(match[2]);
        if (!isNaN(p)) page = p;
        if (!isNaN(l)) limit = l;
      }

      // 如果解析结果为 NaN，则使用默认值
      if (isNaN(page)) page = 1;
      if (isNaN(limit)) limit = 10;

      const hostype = req.query.hostype;
      const districtCode = req.query.districtCode;

      // 过滤数据
      let filteredContent = data.content;
      if (hostype) {
        filteredContent = filteredContent.filter(item => item.hostype == hostype);
      }
      if (districtCode) {
        filteredContent = filteredContent.filter(item => item.districtCode == districtCode);
      }

      // 计算分页切片
      const start = (page - 1) * limit;
      const end = page * limit;
      const list = filteredContent.slice(start, end);

      // 防止请求页码超出范围
      const totalPages = Math.ceil(filteredContent.length / limit);
      if (page > totalPages && totalPages > 0) {
        return {
          code: 200,
          message: '成功',
          ok: true,
          data: {
            content: [],
            pageable: {
              sort: { sorted: true, unsorted: false, empty: false },
              pageNumber: page - 1,
              pageSize: limit,
              offset: start,
              paged: true,
              unpaged: false
            },
            totalPages: totalPages,
            totalElements: filteredContent.length,
            last: true,
            number: page - 1,
            sort: { sorted: true, unsorted: false, empty: false },
            numberOfElements: 0,
            first: false,
            empty: true
          }
        };
      }

      return {
        code: 200,
        message: '成功',
        ok: true,
        data: {
          content: list,
          pageable: {
            sort: {
              sorted: true,
              unsorted: false,
              empty: false
            },
            pageNumber: page - 1,
            pageSize: limit,
            offset: start,
            paged: true,
            unpaged: false
          },
          totalPages: totalPages,
          totalElements: filteredContent.length,
          last: end >= filteredContent.length,
          number: page - 1,
          sort: {
            sorted: true,
            unsorted: false,
            empty: false
          },
          numberOfElements: list.length,
          first: page === 1,
          empty: list.length === 0,
          size: limit
        }
      };
    }
  },

  {
    url: '/api/hos/hospital/:hoscode',
    method: 'get',
    response: (req) => {
      const hoscode = req.query.hoscode || (req.params && req.params.hoscode);
      const item = data.content.find(it => String(it.hoscode) === String(hoscode));
      if (!item) {
        return {
          code: 200,
          message: '成功',
          ok: true,
          data: null
        };
      }
      const detail = {
        bookingRule: {
          cycle: item.bookingRule.cycle,
          releaseTime: item.bookingRule.releaseTime,
          stopTime: item.bookingRule.stopTime,
          quitDay: item.bookingRule.quitDay,
          quitTime: item.bookingRule.quitTime,
          rule: item.bookingRule.rule
        },
        hospital: {
          id: String(item.id),
          createTime: '2021-01-01 00:00:00',
          updateTime: '2021-01-01 00:00:00',
          isDeleted: 0,
          param: {
            hostypeString: item.param.hostypeString,
            fullAddress: item.param.fullAddress
          },
          hoscode: String(item.hoscode),
          hosname: item.hosname,
          hostype: String(item.hostype),
          provinceCode: item.provinceCode,
          cityCode: item.cityCode,
          districtCode: item.districtCode,
          address: item.address,
          logoData: item.logoData,
          intro: item.intro,
          route: item.route,
          status: item.status,
          bookingRule: null
        }
      };
      return {
        code: 200,
        message: '成功',
        ok: true,
        data: detail
      };
    }
  },

  // 4. 获取医院科室列表接口
  {
    url: '/api/hos/hospital/department/:hoscode',
    method: 'get',
    response: (req) => {
      const hoscode = req.params?.hoscode;

      // 根据医院编码生成科室数据，确保数据结构符合 register 页面和 store 的要求
      const departmentData = [
        {
          depcode: "200040878",
          depname: "内科",
          children: [
            { depcode: "200040879", depname: "神经内科" },
            { depcode: "200040880", depname: "消化内科" },
            { depcode: "200040881", depname: "呼吸内科" },
            { depcode: "200040883", depname: "心血管内科" },
            { depcode: "200040884", depname: "肾内科" },
            { depcode: "200040885", depname: "血液内科" },
            { depcode: "200041001", depname: "内分泌科" },
            { depcode: "200040886", depname: "风湿免疫科" },
            { depcode: "200041002", depname: "感染内科" },
            { depcode: "200040887", depname: "老年医学科" },
            { depcode: "200041003", depname: "变态反应科" },
            { depcode: "200040882", depname: "内科门诊" }
          ]
        },
        {
          depcode: "200040888",
          depname: "外科",
          children: [
            { depcode: "200040889", depname: "普通外科" },
            { depcode: "200040890", depname: "神经外科" },
            { depcode: "200040891", depname: "心胸外科" },
            { depcode: "200040893", depname: "骨科" },
            { depcode: "200040892", depname: "泌尿外科" },
            { depcode: "200041004", depname: "肝胆外科" },
            { depcode: "200041005", depname: "胃肠外科" },
            { depcode: "200040895", depname: "乳腺外科" },
            { depcode: "200041007", depname: "血管外科" },
            { depcode: "200040894", depname: "烧伤整形科" },
            { depcode: "200041006", depname: "肛肠科" },
            { depcode: "200041009", depname: "运动医学科" },
            { depcode: "200041008", depname: "器官移植科" }
          ]
        },
        {
          depcode: "200040896",
          depname: "妇产科",
          children: [
            { depcode: "200040897", depname: "妇科" },
            { depcode: "200040898", depname: "产科" },
            { depcode: "200040900", depname: "生殖医学中心" },
            { depcode: "200041011", depname: "围产医学科" },
            { depcode: "200041010", depname: "遗传咨询科" },
            { depcode: "200040899", depname: "计划生育科" }
          ]
        },
        {
          depcode: "200040901",
          depname: "儿科",
          children: [
            { depcode: "200040902", depname: "儿科门诊" },
            { depcode: "200040903", depname: "儿科急诊" },
            { depcode: "200040904", depname: "新生儿科" },
            { depcode: "200041014", depname: "小儿神经内科" },
            { depcode: "200041015", depname: "小儿呼吸内科" },
            { depcode: "200041012", depname: "小儿外科" },
            { depcode: "200041013", depname: "儿童保健科" }
          ]
        },
        {
          depcode: "200040905",
          depname: "五官科",
          children: [
            { depcode: "200040906", depname: "眼科" },
            { depcode: "200041018", depname: "眼底病科" },
            { depcode: "200040907", depname: "耳鼻咽喉头颈外科" },
            { depcode: "200040908", depname: "口腔科" },
            { depcode: "200041016", depname: "口腔修复科" },
            { depcode: "200041017", depname: "口腔正畸科" }
          ]
        },
        {
          depcode: "200041019",
          depname: "皮肤性病科",
          children: [
            { depcode: "200041020", depname: "皮肤科" },
            { depcode: "200041022", depname: "皮肤美容科" },
            { depcode: "200041021", depname: "性病科" }
          ]
        },
        {
          depcode: "200041023",
          depname: "中医科",
          children: [
            { depcode: "200041024", depname: "中医内科" },
            { depcode: "200041025", depname: "中医外科" },
            { depcode: "200041026", depname: "中医妇科" },
            { depcode: "200041027", depname: "针灸推拿科" },
            { depcode: "200041028", depname: "中西医结合科" }
          ]
        },
        {
          depcode: "200041029",
          depname: "肿瘤科",
          children: [
            { depcode: "200041030", depname: "肿瘤内科" },
            { depcode: "200041031", depname: "肿瘤外科" },
            { depcode: "200041032", depname: "放疗科" },
            { depcode: "200041033", depname: "介入治疗科" }
          ]
        },
        {
          depcode: "200041034",
          depname: "精神心理科",
          children: [
            { depcode: "200041036", depname: "精神科" },
            { depcode: "200041035", depname: "临床心理科" },
            { depcode: "200041037", depname: "睡眠医学科" }
          ]
        },
        {
          depcode: "200041038",
          depname: "康复医学科",
          children: [
            { depcode: "200041039", depname: "神经康复科" },
            { depcode: "200041040", depname: "骨科康复科" },
            { depcode: "200041041", depname: "疼痛康复科" }
          ]
        },
        {
          depcode: "200041042",
          depname: "急诊医学科",
          children: [
            { depcode: "200041043", depname: "急诊内科" },
            { depcode: "200041044", depname: "急诊外科" },
            { depcode: "200041045", depname: "急诊ICU" }
          ]
        },
        {
          depcode: "200041046",
          depname: "医技科室",
          children: [
            { depcode: "200041047", depname: "放射科" },
            { depcode: "200041048", depname: "超声医学科" },
            { depcode: "200041049", depname: "核医学科" },
            { depcode: "200041050", depname: "检验科" },
            { depcode: "200041051", depname: "病理科" },
            { depcode: "200041056", depname: "药剂科" },
            { depcode: "200041057", depname: "输血科" }
          ]
        },
        {
          depcode: "200041052",
          depname: "特需医疗",
          children: [
            { depcode: "200041053", depname: "特需门诊" },
            { depcode: "200041054", depname: "国际医疗部" },
            { depcode: "200041055", depname: "高干保健科" }
          ]
        },
        {
          depcode: "200041058",
          depname: "麻醉科",
          children: [
            { depcode: "200041059", depname: "临床麻醉" },
            { depcode: "200041060", depname: "疼痛门诊" }
          ]
        }
      ];

      return {
        code: 200,
        message: "成功",
        ok: true,
        data: departmentData
      }
    }
  },

  // 5. 获取医院可预约排班信息
  {
    url: '/api/hosp/hospital/auth/getBookingScheduleRule/:page/:limit/:hoscode/:depcode',
    method: 'get',
    response: (req) => {
      const page = parseInt(req.params?.page || '1');
      const limit = parseInt(req.params?.limit || '7');
      const hoscode = req.params?.hoscode;
      const depcode = req.params?.depcode;

      // 生成未朆30天的排班日期
      const scheduleList: any[] = [];
      const today = new Date();
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const workDate = date.toISOString().split('T')[0];
        const dayOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];

        // 根据索引生成不同状态的数据，便于查看效果
        let status, availableNumber;
        if (i === 0) {
          // 第1天：即将放号
          status = 1;
          availableNumber = Mock.mock('@integer(20, 100)');
        } else if (i === 1) {
          // 第2天：停止挂号
          status = -1;
          availableNumber = 0;
        } else if (i === 2) {
          // 第3天：约满了
          status = 0;
          availableNumber = -1;
        } else if (i === 3) {
          // 第4天：有号
          status = 0;
          availableNumber = Mock.mock('@integer(5, 30)');
        } else {
          // 其他日期：随机状态
          const random = Mock.mock('@integer(1, 10)');
          if (random <= 2) {
            // 20%概率停止挂号
            status = -1;
            availableNumber = 0;
          } else if (random <= 4) {
            // 20%概率约满
            status = 0;
            availableNumber = -1;
          } else if (random <= 6) {
            // 20%概率即将放号
            status = 1;
            availableNumber = Mock.mock('@integer(20, 100)');
          } else {
            // 40%概率有号
            status = 0;
            availableNumber = Mock.mock('@integer(5, 50)');
          }
        }

        scheduleList.push({
          workDate: workDate,
          workData: workDate,
          workDateMd: `${date.getMonth() + 1}/${date.getDate()}`,
          dayOfWeek: dayOfWeek,
          docCount: Mock.mock('@integer(5, 20)'),
          reservedNumber: Mock.mock('@integer(0, 50)'),
          availableNumber: availableNumber,
          status: status
        });
      }

      const start = (page - 1) * limit;
      const end = page * limit;
      const bookingScheduleList = scheduleList.slice(start, end);

      return {
        code: 200,
        message: '成功',
        ok: true,
        data: {
          total: scheduleList.length,
          bookingScheduleList: bookingScheduleList,
          baseMap: {
            hosname: data.content.find(h => String(h.hoscode) === String(hoscode))?.hosname || '示例医院',
            bigname: '普通门诊',
            depname: '神经内科',
            workDateString: '2026年01月',
            releaseTime: '08:00',
            stopTime: '12:00'
          }
        }
      };
    }
  },

  // 6. 获取某天的排班详情（医生列表）
  {
    url: '/api/hosp/hospital/auth/findScheduleList/:hoscode/:depcode/:workDate',
    method: 'get',
    response: (req) => {
      const hoscode = req.params?.hoscode;
      const depcode = req.params?.depcode;
      const workDate = req.params?.workDate;
      const amountMap = { '主任医师': 500, '副主任医师': 300, '主治医师': 100, '医师': 50 };

      const scheduleList: any[] = [];
      const doctorCount = Mock.mock('@integer(3, 8)');

      for (let i = 0; i < doctorCount; i++) {
        const title = Mock.mock('@pick(["主任医师", "副主任医师", "主治医师", "医师"])');
        const availableNumber = Mock.mock('@integer(0, 20)');
        const doctorId = Mock.mock('@id');

        scheduleList.push({
          id: doctorId,
          hoscode: hoscode,
          depcode: depcode,
          title: title,
          docname: Mock.mock('@cname'),
          skill: Mock.mock('@csentence(10, 20)'),
          workDate: workDate,
          workTime: Mock.mock('@integer(0, 1)'),
          reservedNumber: Mock.mock('@integer(0, 10)'),
          availableNumber: availableNumber,
          amount: amountMap[title as keyof typeof amountMap],
          status: availableNumber > 0 ? 1 : 0,
          hosScheduleId: doctorId,
          param: {
            dayOfWeek: Mock.mock('@pick(["周一", "周二", "周三", "周四", "周五", "周六", "周日"])'),
            depname: '神经内科',
            hosname: data.content.find(h => String(h.hoscode) === String(hoscode))?.hosname || '北京协和医院'
          }
        });
      }

      return {
        code: 200,
        message: '成功',
        ok: true,
        data: scheduleList
      };
    }
  },

  // 7. 提交预约挂号
  {
    url: '/api/order/orderInfo/auth/submitOrder/:hoscode/:scheduleId/:patientId',
    method: 'post',
    response: (req) => {
      const hoscode = req.params?.hoscode;
      const scheduleId = req.params?.scheduleId;
      const patientId = req.params?.patientId;

      console.log('Mock收到提交订单请求:', { hoscode, scheduleId, patientId });

      // 模拟90%成功率
      const isSuccess = Mock.mock('@boolean(9, 1, true)');

      if (isSuccess) {
        const orderId = Mock.mock('@integer(100000, 999999)');
        return {
          code: 200,
          message: '预约成功',
          ok: true,
          data: orderId  // 直接返回订单ID（number类型）
        };
      } else {
        return {
          code: 201,
          message: '该时段号源已满，请选择其他时段',
          ok: false,
          data: null
        };
      }
    }
  },

  // 9. 获取就诊人列表
  {
    url: '/api/user/patient/auth/findAll',
    method: 'get',
    response: () => {
      const patientList: any[] = [];

      // 使用共享的就诊人数据，确保与订单数据一致
      sharedPatientList.forEach((patient) => {
        patientList.push({
          id: patient.id,
          createTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          updateTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          isDeleted: 0,
          userId: Mock.mock('@integer(10000, 99999)'),
          name: patient.name,
          certificatesType: '10',
          certificatesNo: Mock.mock(/^\d{17}[\dX]$/),
          phone: Mock.mock(/^1[3-9]\d{9}$/),
          sex: Mock.mock('@integer(0, 1)'),
          birthdate: Mock.mock('@date("yyyy-MM-dd")'),
          isMarry: Mock.mock('@integer(0, 1)'),
          provinceCode: null,
          cityCode: null,
          districtCode: null,
          address: Mock.mock('@county(true)'),
          contactsName: Mock.mock('@cname'),
          contactsCertificatesType: '10',
          contactsCertificatesNo: Mock.mock(/^\d{17}[\dX]$/),
          contactsPhone: Mock.mock(/^1[3-9]\d{9}$/),
          isInsure: Mock.mock('@integer(0, 1)'),
          cardNo: null,
          status: '1',
          param: {
            certificatesTypeString: '身份证',
            contactsCertificatesTypeString: '身份证',
            cityString: null,
            fullAddress: Mock.mock('@county(true)') + Mock.mock('@cword(5,10)') + '号',
            districtString: null,
            provinceString: null
          }
        });
      });

      console.log('[Mock] 就诊人列表响应:', { count: patientList.length, patients: sharedPatientList.map(p => p.name) });

      return {
        code: 200,
        message: '成功',
        ok: true,
        data: patientList
      };
    }
  },

  // 10.1 获取订单状态列表
  {
    url: '/api/order/orderInfo/auth/getStatusList',
    method: 'get',
    response: () => {
      const statusList = [
        { status: -1, comment: '已取消' },
        { status: 0, comment: '预约成功，待支付' },
        { status: 1, comment: '已支付' }
      ];

      console.log('[Mock] 订单状态列表响应:', statusList);

      return {
        code: 200,
        message: '成功',
        ok: true,
        data: statusList
      };
    }
  },

  // 11. 获取订单详情
  {
    url: '/api/order/orderInfo/auth/getOrderInfo/:orderId',
    method: 'get',
    response: (req) => {
      const orderId = req.params?.orderId;
      const reserveDate = Mock.mock('@date("yyyy-MM-dd")');
      const createTime = Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")');
      
      // 如果内存中没有该订单状态，初始化为 0（预约成功，待支付）
      if (orderStatusStore[orderId] === undefined) {
        orderStatusStore[orderId] = 0;
      }
      
      const orderStatus = orderStatusStore[orderId];
      const statusMap = {
        '-1': '已取消',
        '0': '预约成功，待支付',
        '1': '已支付',
        '2': '已退款'
      };

      return {
        code: 200,
        message: '成功',
        ok: true,
        data: {
          id: Number(orderId) || Mock.mock('@integer(10000, 99999)'),
          createTime: createTime,
          updateTime: createTime,
          isDeleted: 0,
          param: {
            orderStatusString: statusMap[orderStatus.toString() as keyof typeof statusMap]
          },
          userId: 10001,
          outTradeNo: 'TK' + Mock.mock('@datetime("yyyyMMddHHmmss")') + Mock.mock('@integer(1000, 9999)'),
          hoscode: '10001',
          hosname: '北京协和医院',
          depcode: '200040879',
          depname: '神经内科',
          scheduleId: Mock.mock('@id'),
          title: Mock.mock('@pick(["主任医师", "副主任医师", "主治医师"])'),
          reserveDate: reserveDate,
          patientId: Mock.mock('@id'),
          patientName: Mock.mock('@cname'),
          patientPhone: Mock.mock(/^1[3-9]\d{9}$/),
          reserveTime: Mock.mock('@pick(["上午", "下午"])'),
          hosRecordId: Mock.mock('@id'),
          number: Mock.mock('@integer(1, 50)'),
          fetchTime: `${reserveDate} 08:00:00`,
          fetchAddress: '一楼大厅自助取号机',
          amount: Mock.mock('@pick([100, 300, 500])'),
          quitTime: `${reserveDate} 15:30:00`,
          orderStatus: orderStatus
        }
      };
    }
  },

  // 10. 获取订单列表
  {
    url: '/api/order/orderInfo/auth/:page/:limit',
    method: 'get',
    response: (req) => {
      // 多种方式获取分页参数，确保兼容性
      let page = 1;
      let limit = 10;

      // 方式1: 从params获取
      if (req.params?.page) {
        page = parseInt(req.params.page);
      }
      if (req.params?.limit) {
        limit = parseInt(req.params.limit);
      }

      // 方式2: 从URL正则解析（备用）
      const url = req.url || '';
      const match = url.match(/\/api\/order\/orderInfo\/auth\/(\d+)\/(\d+)/);
      if (match) {
        page = parseInt(match[1]);
        limit = parseInt(match[2]);
      }

      // 防止NaN
      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(limit) || limit < 1) limit = 10;

      const orderStatus = req.query?.orderStatus;
      const patientId = req.query?.patientId;

      console.log('[Mock] 订单列表请求:', { page, limit, orderStatus, patientId, url: req.url });

      // 确保订单数据已生成
      generateMockOrders();

      // 根据条件筛选
      let filteredList = mockOrderList!;

      // 按订单状态筛选
      if (orderStatus !== undefined && orderStatus !== '' && orderStatus !== null) {
        const code = parseInt(orderStatus as string);
        if (!isNaN(code)) {
          filteredList = filteredList.filter(order => order.orderStatus === code);
        }
      }

      // 按就诊人筛选
      if (patientId !== undefined && patientId !== '' && patientId !== null) {
        const pid = parseInt(patientId as string);
        if (!isNaN(pid)) {
          filteredList = filteredList.filter(order => order.patientId === pid);
        }
      }

      // 计算分页
      const start = (page - 1) * limit;
      const end = start + limit;
      const pageData = filteredList.slice(start, end);
      const totalPages = Math.ceil(filteredList.length / limit);

      console.log('[Mock] 订单列表响应:', {
        total: filteredList.length,
        page,
        limit,
        totalPages,
        returnedRecords: pageData.length,
        start,
        end
      });

      return {
        code: 200,
        message: '成功',
        ok: true,
        data: {
          records: pageData,
          total: filteredList.length,
          size: limit,
          current: page,
          pages: totalPages
        }
      };
    }
  },

  // 12. 取消预约
  {
    url: '/api/order/orderInfo/auth/cancelOrder/:orderId',
    method: 'get',
    response: (req) => {
      const orderId = req.params?.orderId;
      console.log('Mock收到取消预约请求:', orderId);
      
      // 模拟95%成功率
      const isSuccess = Mock.mock('@boolean(19, 1, true)');
      
      if (isSuccess) {
        // 更新订单状态为 -1（已取消）
        orderStatusStore[orderId] = -1;
        
        return {
          code: 200,
          message: '取消预约成功',
          ok: true,
          data: true
        };
      } else {
        return {
          code: 201,
          message: '取消失败，该订单已过退号截止时间',
          ok: false,
          data: false
        };
      }
    }
  },

  // 13. 支付订单（模拟微信支付）
  {
    url: '/api/order/orderInfo/auth/payOrder/:orderId',
    method: 'get',
    response: (req) => {
      const orderId = req.params?.orderId;
      console.log('Mock收到支付订单请求:', orderId);
      
      // 模拟支付成功（100%成功率）
      // 更新订单状态为 1（已支付）
      orderStatusStore[orderId] = 1;
      
      return {
        code: 200,
        message: '支付成功',
        ok: true,
        data: true
      };
    }
  },

  // 14. 获取短信验证码
  {
    url: '/api/sms/send/:phone',
    method: 'get',
    response: (req) => {
      return {
        code: 200,
        message: '验证码发送成功',
        ok: true,
        data: Mock.mock(/\d{6}/) // 生成6位随机数字验证码
      }
    }
  },

  // 14. 用户登录接口
  {
    url: '/api/user/login',
    method: 'post',
    response: (req) => {
      return {
        code: 200,
        message: '登录成功',
        ok: true,
        data: {
          name: Mock.mock('@cname'),
          token: Mock.mock('@guid')
        }
      }
    }
  },

  // 模拟失败/错误接口
  {
    url: '/api/hosp/hospital/error',
    method: 'get',
    response: () => {
      return {
        code: 201,
        message: '系统繁忙，请稍后再试',
        ok: false,
        data: null
      }
    }
  },

  // 15. 获取微信扫码登录参数
  {
    url: '/api/user/wxlogin/getLoginParam',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        ok: true,
        data: {
          redirectUrl: 'http://syt.atguigu.cn/weixin/callback',
          appid: 'wx45928373359d9c8',
          scope: 'snsapi_login',
          state: 'syt'
        }
      }
    }
  },

  // 16. 获取支付二维码
  {
    url: '/api/order/weixin/createNative/:orderId',
    method: 'get',
    response: (req) => {
      const orderId = req.params?.orderId;
      console.log('Mock收到获取二维码请求:', orderId);
      
      // 生成微信支付二维码链接（模拟）
      const codeUrl = `weixin://wxpay/bizpayurl?pr=mock${orderId}`;
      
      return {
        code: 200,
        message: '成功',
        ok: true,
        data: {
          codeUrl: codeUrl,
          orderId: orderId,
          totalFee: Mock.mock('@integer(100, 500)'),
          resultCode: 'SUCCESS'
        }
      };
    }
  },

  // 17. 获取当前用户信息
  {
    url: '/api/user/auth/getUserInfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        ok: true,
        data: {
          id: Mock.mock('@integer(10000, 99999)'),
          createTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          updateTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          isDeleted: 0,
          param: {},
          openid: null,
          certificatesType: Mock.mock('@pick(["身份证", "护照", "港澳通行证"])'),
          certificatesNo: Mock.mock(/^\d{17}[\dX]$/),
          certificatesUrl: null,
          nickName: Mock.mock('@cname'),
          name: Mock.mock('@cname'),
          phone: Mock.mock(/^1[3-9]\d{9}$/),
          authStatus: Mock.mock('@integer(0, 2)'),
          status: Mock.mock('@integer(0, 1)')
        }
      };
    }
  },

  // 18. 用户实名认证接口
  {
    url: '/api/user/auth/userAuah',
    method: 'post',
    response: (req) => {
      const { name, certificatesType, certificatesNo, certificatesUrl } = req.body || {};
      console.log('Mock收到实名认证请求:', { name, certificatesType, certificatesNo, certificatesUrl });
      
      // 简单校验
      if (!name || !certificatesType || !certificatesNo) {
        return {
          code: 201,
          message: '请填写完整的认证信息',
          ok: false,
          data: null
        };
      }
      
      return {
        code: 200,
        message: '认证成功',
        ok: true,
        data: {
          name,
          certificatesType,
          certificatesNo,
          certificatesUrl,
          authStatus: 1  // 认证成功状态
        }
      };
    }
  },

  // 19. 文件上传接口
  {
    url: '/api/oss/file/fileUpLoad',
    method: 'post',
    response: (req) => {
      const fileHost = req.query?.fileHost;
      console.log('Mock收到文件上传请求, fileHost:', fileHost);
      
      // 模拟返回一个图片URL
      const mockImageUrl = `/images/${Mock.mock('@integer(1, 10)')}.png`;
      
      return {
        code: 200,
        message: '上传成功',
        ok: true,
        data: mockImageUrl
      };
    }
  }
];

