import random, numpy as np, pandas as pd
from faker import Faker
fake = Faker()
seed = 42
random.seed(seed); np.random.seed(seed); Faker.seed(seed)

n_students = 1200
n_courses = 8
sessions_per_course = 30
assess_types = ['quiz','mid','lab']
assess_per_course = 3

# students
sids = list(range(1, n_students+1))
names = [fake.name() for _ in sids]
reg = [f"23BDS{str(1000+i)[-4:]}" for i in sids]
dob = [fake.date_of_birth(minimum_age=17, maximum_age=25).isoformat() for _ in sids]
gender = [random.choice(['M','F','O']) for _ in sids]
entry_gpa = np.round(np.clip(np.random.normal(7.0, 0.9, n_students), 4.0, 9.5),2)
sec = [random.choice(['low','mid','high']) for _ in sids]

students = pd.DataFrame({
    'student_id': sids,
    'reg_no': reg,
    'name': names,
    'dob': dob,
    'gender': gender,
    'entry_gpa': entry_gpa,
    'socio_econ': sec
})

# place an example student Vijay VS with reg 23BDS0264 (if exists)
if n_students >= 1:
    students.loc[0, 'name'] = "Vijay VS"
    students.loc[0, 'reg_no'] = "23BDS0264"

# courses
cids = list(range(1, n_courses+1))
codes = [f"CSE{100+i}" for i in range(n_courses)]
titles = [f"Course {i}" for i in cids]
instr = [fake.name() for _ in cids]
credits = [3 if i%2==0 else 4 for i in cids]
courses = pd.DataFrame({'course_id': cids, 'code': codes, 'title': titles, 'credits': credits, 'instructor': instr})

# enrollments (each student 4-6 courses)
rows_en = []
enid = 1
for sid in sids:
    k = random.randint(4,6)
    chosen = random.sample(cids, k)
    for c in chosen:
        rows_en.append((enid, sid, c, random.choice(['2024-1','2024-2','2025-1'])))
        enid += 1
enroll = pd.DataFrame(rows_en, columns=['enroll_id','student_id','course_id','semester'])

# attendance logs
rows_att = []
att_id = 1
for _, r in enroll.iterrows():
    for s in range(sessions_per_course):
        present = np.random.binomial(1, 0.8 - 0.25*(1 - students.loc[students.student_id==r.student_id,'entry_gpa'].values[0]/10))
        rows_att.append((att_id, r.enroll_id, str(fake.date_between(start_date='-180d', end_date='today')), present))
        att_id += 1
attendance = pd.DataFrame(rows_att, columns=['att_id','enroll_id','session_date','present'])

# assessments
rows_ass = []
aid = 1
for _, r in enroll.iterrows():
    base = max(30, int(np.random.normal(60,12))) 
    for t in assess_types:
        for i in range(assess_per_course):
            # score depends on entry_gpa and randomness
            eg = students.loc[students.student_id==r.student_id,'entry_gpa'].values[0]
            score = np.clip(np.random.normal(base * (eg/8.0), 10), 0, 100)
            rows_ass.append((aid, r.enroll_id, t, float(round(score,2)), 100.0, str(fake.date_between(start_date='-120d', end_date='today'))))
            aid += 1
assess = pd.DataFrame(rows_ass, columns=['assess_id','enroll_id','atype','score','out_of','date'])

# compute derived metrics and finals
fs = []
fid = 1
for _, r in enroll.iterrows():
    sid = r.student_id
    eid = r.enroll_id
    att_sub = attendance[attendance.enroll_id==eid]
    att_pct = att_sub.present.mean() if len(att_sub)>0 else 0
    ass_sub = assess[assess.enroll_id==eid]
    avg_ass = ass_sub.score.mean() if len(ass_sub)>0 else 0
    eg = students.loc[students.student_id==sid,'entry_gpa'].values[0]
    final_score = 0.5*avg_ass + 40*(att_pct) + (eg*2) + np.random.normal(0,5)
    final_score = np.clip(final_score, 0, 100)
    grade = 'F'
    if final_score >= 85: grade='A'
    elif final_score >= 70: grade='B'
    elif final_score >= 55: grade='C'
    elif final_score >= 40: grade='D'
    else: grade='F'
    # at risk if final_score < 50 or attendance low -> add some randomness
    risk = 1 if (final_score<50 or att_pct<0.6) and random.random() < 0.9 else 0
    interv = 1 if risk==1 and random.random() < 0.6 else 0
    fs.append((fid, eid, float(round(final_score,2)), grade, risk, interv))
    fid += 1
finals = pd.DataFrame(fs, columns=['final_id','enroll_id','final_score','grade','at_risk','intervention'])

# feedback (short template sentences)
rows_f = []
fid2 = 1
for _, r in enroll.iterrows():
    s = students.loc[students.student_id==r.student_id,'name'].values[0]
    score = finals.loc[finals.enroll_id==r.enroll_id,'final_score'].values[0]
    att_sub = attendance[attendance.enroll_id==r.enroll_id]
    att_pct = att_sub.present.mean() if len(att_sub)>0 else 0
    if score>80:
        txt = f"{s} demonstrated strong understanding; recommend advanced readings."
    elif score>60:
        txt = f"{s} is performing satisfactorily; focus on weaker topics in upcoming labs."
    elif score>45:
        txt = f"{s} needs attention; suggest tutoring and attendance improvement."
    else:
        txt = f"{s} is at high risk; immediate intervention recommended."
    # add some variability
    txt += " " + fake.sentence(nb_words=6)
    rows_f.append((fid2, r.enroll_id, txt))
    fid2 += 1
feedback = pd.DataFrame(rows_f, columns=['feed_id','enroll_id','text_feedback'])

# export CSVs
students.to_csv('students.csv', index=False)
courses.to_csv('courses.csv', index=False)
enroll.to_csv('enroll.csv', index=False)
attendance.to_csv('attendance.csv', index=False)
assess.to_csv('assess.csv', index=False)
finals.to_csv('finals.csv', index=False)
feedback.to_csv('feedback.csv', index=False)

print("done, files:", ['students.csv','courses.csv','enroll.csv','attendance.csv','assess.csv','finals.csv','feedback.csv'])
