export default function Calendar(props) {
  const { date } = props;

  const weekDays = {
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота',
    0: 'Воскресенье'
  };

  const months = {
    0: { im: 'Январь', rod: 'Января' },
    1: { im: 'Февраля', rod: 'Февраля' },
    2: { im: 'Март', rod: 'Марта' },
    3: { im: 'Апрель', rod: 'Апреля' },
    4: { im: 'Май', rod: 'Мая' },
    5: { im: 'Июнь', rod: 'Июня' },
    6: { im: 'Июль', rod: 'Июля' },
    7: { im: 'Август', rod: 'Августа' },
    8: { im: 'Сентябрь', rod: 'Сентября' },
    9: { im: 'Октябрь', rod: 'Октября' },
    10: { im: 'Ноябрь', rod: 'Ноября' },
    11: { im: 'Декабрь', rod: 'Декабря' }
  };

  const currentDate = date.getDate();

  const currentWeekDay = weekDays[date.getDay()];

  const currentMonth = date.getMonth();
  const currentMonthRod = months[currentMonth].rod;
  const currentMonthIm = months[currentMonth].im;

  const currentYear = date.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

  const startingWeekDay = firstDayOfMonth.getDay();

  // +2 берется от того, что +1 дает setDate(0) переключащий на один день назад (setDate(-1) переключает на два)
  // и еще +1 на сдвиг понедельник у нас нулевой, а в Date - первый
  if (startingWeekDay) {
    firstDayOfMonth.setDate(-startingWeekDay + 2);
  } else {
    firstDayOfMonth.setDate(-7 + 2);
  }

  function generateMonthDays(startDate, monthNumber) {
    const result = [];

    while((startDate.getMonth() !== monthNumber + 1) && (monthNumber !== 11 && startDate.getMonth() !== 0)) {
      const row = [];

      for (let i = 0; i < 7; i++) {
        row.push({
          otherMonth: startDate.getMonth() !== monthNumber,
          day: startDate.getDate()
        });

        startDate.setDate(startDate.getDate() + 1);
      }

      result.push(row);
    }

    return result;
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{currentWeekDay}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{currentDate}</div>
          <div className="ui-datepicker-material-month">{currentMonthRod}</div>
          <div className="ui-datepicker-material-year">{currentYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{currentMonthIm}</span>&nbsp;<span className="ui-datepicker-year">{currentYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col/>
          <col/>
          <col/>
          <col/>
          <col/>
          <col className="ui-datepicker-week-end"/>
          <col className="ui-datepicker-week-end"/>
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {
            generateMonthDays(firstDayOfMonth, currentMonth).map(
              (row, index) => (<tr key={index}>
                {row.map(
                  dayInfo => (
                    <td
                      key={(dayInfo.otherMonth ? 'o' : '') + dayInfo.day}
                      className={dayInfo.otherMonth ? 'ui-datepicker-other-month' : ''}
                    >{dayInfo.day}</td>
                  )
                )}
              </tr>)
            )
          }
        </tbody>
      </table>
    </div>
  );
}
