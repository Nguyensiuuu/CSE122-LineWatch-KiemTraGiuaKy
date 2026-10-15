const nutTao = document.getElementById('nuttao');
const khungTao = document.getElementById('khungtao');
const formTao = document.getElementById('formtao');
const danhSachDayChuyen = document.getElementById('cacdaychuyen');
const loiTao = document.getElementById('loi');
const congTacToi = document.getElementById('doimau');

congTacToi.addEventListener('change', () => {
    document.body.classList.toggle('toi', congTacToi.checked);
});

nutTao.addEventListener('click', () => {
    khungTao.hidden = !khungTao.hidden;
    loiTao.textContent = '';

    if (!khungTao.hidden) {
        document.getElementById('madaychuyen').focus();
    }
});

document.getElementById('huytao').addEventListener('click', () => {
    khungTao.hidden = true;
    formTao.reset();
});

formTao.addEventListener('submit', event => {
    event.preventDefault();

    const maDayChuyen = document.getElementById('madaychuyen').value.trim().toUpperCase();
    const tenDayChuyen = document.getElementById('tendaychuyen').value.trim();
    const maMay = document.getElementById('mamay').value
        .split(',')
        .map(may => may.trim())
        .filter(may => may !== '');
    const dangTamDung = document.getElementById('trangthai').value === 'tamdung';

    if (!maDayChuyen || !tenDayChuyen || maMay.length === 0) {
        loiTao.textContent = 'Vui lòng nhập đủ thông tin.';
        return;
    }

    for (const the of danhSachDayChuyen.children) {
        if (the.querySelector('h3').textContent.split(' · ')[0] === maDayChuyen) {
            loiTao.textContent = 'Mã dây chuyền đã tồn tại.';
            return;
        }
    }

    const theMoi = danhSachDayChuyen.firstElementChild.cloneNode(true);
    const nhanTrangThai = theMoi.querySelector('.trangthai');
    theMoi.querySelector('h3').textContent = `${maDayChuyen} · ${tenDayChuyen}`;
    theMoi.querySelector('.soluong').textContent = `${maMay.length} máy`;
    theMoi.classList.toggle('daychuyen-tamdung', dangTamDung);
    nhanTrangThai.textContent = dangTamDung ? 'Tạm dừng' : 'Đang hoạt động';
    nhanTrangThai.classList.toggle('tamdung', dangTamDung);

    const cacMay = theMoi.querySelector('.cacmay');
    cacMay.textContent = '';
    maMay.forEach(may => {
        const span = document.createElement('span');
        span.textContent = may;
        cacMay.append(span);
    });

    danhSachDayChuyen.append(theMoi);
    formTao.reset();
    khungTao.hidden = true;
});
