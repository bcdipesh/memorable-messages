"""Add isAdmin column to users table

Revision ID: 9911a4982e16
Revises: 77e8aaa10301
Create Date: 2024-01-31 22:14:04.879693

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9911a4982e16'
down_revision = '77e8aaa10301'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('isAdmin', sa.Boolean(), server_default=sa.text('false'), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('isAdmin')

    # ### end Alembic commands ###