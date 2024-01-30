"""Create users, occasions and delivery_histories table

Revision ID: 77e8aaa10301
Revises: 
Create Date: 2024-01-30 11:28:48.735564

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '77e8aaa10301'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password_hash', sa.String(length=256), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('occasions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('delivery_method', sa.String(length=64), nullable=False),
    sa.Column('occasion_type', sa.String(length=256), nullable=False),
    sa.Column('message_content', sa.Text(), nullable=False),
    sa.Column('date_time', sa.DateTime(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('delivery_histories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('occasion_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=64), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['occasion_id'], ['occasions.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('delivery_histories')
    op.drop_table('occasions')
    op.drop_table('users')
    # ### end Alembic commands ###
